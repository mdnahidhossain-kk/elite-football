import React from "react";
import { FlashList } from "@shopify/flash-list";
import { Pressable, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { SearchFilter, SearchQuery, SearchResultItem } from "../../../models/phase2";
import { useTheme } from "../../../theme/useTheme";
import { SearchScreenProps } from "../../../types/navigation";
import { ContentFallbackState } from "../../shared/components/ContentFallbackState";
import { RecentSearchesList } from "../components/RecentSearchesList";
import { SearchFilterBar } from "../components/SearchFilterBar";
import { openSearchResult } from "../navigation/openSearchResult";
import { buildSearchScreenSnapshot, deriveSearchSurfaceState } from "./searchScreenModel";
import {
  createDebouncedSearchExecutor,
  mockSearchIndex,
  runSearchProjection,
} from "../services/searchEngine";
import { searchRecentsStorage } from "../services/searchRecentsStorage";

export function SearchScreen({ navigation }: SearchScreenProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;
  const [query, setQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<SearchFilter>("all");
  const [results, setResults] = React.useState<SearchResultItem[]>([]);
  const [recents, setRecents] = React.useState<SearchQuery[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const debouncedSearch = React.useMemo(
    () =>
      createDebouncedSearchExecutor((nextQuery, nextFilter) =>
        runSearchProjection(mockSearchIndex, nextQuery, nextFilter)
      ),
    []
  );

  React.useEffect(() => {
    let mounted = true;
    searchRecentsStorage.getRecents().then(items => {
      if (mounted) {
        setRecents(items);
      }
    });

    return () => {
      mounted = false;
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  React.useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setIsSearching(false);
      setResults([]);
      return;
    }

    let mounted = true;
    setIsSearching(true);
    debouncedSearch.execute(trimmed, activeFilter).then(nextResults => {
      if (!mounted) {
        return;
      }
      setResults(nextResults);
      setIsSearching(false);
    });

    return () => {
      mounted = false;
    };
  }, [activeFilter, debouncedSearch, query]);

  const handleSaveRecent = React.useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    const nextRecents = await searchRecentsStorage.saveRecent({
      text: trimmed,
      filter: activeFilter,
    });
    setRecents(nextRecents);
  }, [activeFilter, query]);

  const handleSelectRecent = React.useCallback((recent: SearchQuery) => {
    setActiveFilter(recent.filter);
    setQuery(recent.text);
  }, []);

  const handleClearRecents = React.useCallback(async () => {
    await searchRecentsStorage.clearRecents();
    setRecents([]);
  }, []);

  const handleOpenResult = React.useCallback(
    (item: SearchResultItem) => {
      openSearchResult(
        navigation as unknown as {
          navigate: (routeName: string, params?: Record<string, string>) => void;
        },
        item
      );
    },
    [navigation]
  );

  const surfaceState = deriveSearchSurfaceState(query, results, isSearching);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { padding: spacing.lg, gap: spacing.md }]}>
        <Typography variant="h2">Search</Typography>
        <TextInput
          accessibilityLabel="Global search input"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setQuery}
          onSubmitEditing={handleSaveRecent}
          placeholder="Search clubs, players, leagues, or news"
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.input,
            {
              borderRadius: radii.md,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            },
          ]}
          value={query}
        />
        <SearchFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {surfaceState === "recents" ? (
          <RecentSearchesList
            recents={recents}
            onSelect={handleSelectRecent}
            onClear={recents.length > 0 ? handleClearRecents : undefined}
          />
        ) : null}

        {surfaceState === "loading" ? (
          <Typography variant="bodySmall" color="textSecondary">
            Searching...
          </Typography>
        ) : null}

        {surfaceState === "results" ? (
          <FlashList
            data={results}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open search result ${item.title}`}
                onPress={() => handleOpenResult(item)}
                style={[
                  styles.resultItem,
                  {
                    borderRadius: radii.md,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: spacing.md,
                  },
                ]}
              >
                <Typography variant="label">{item.title}</Typography>
                {item.description ? (
                  <Typography variant="caption" color="textSecondary">
                    {item.description}
                  </Typography>
                ) : null}
                <Typography variant="caption" color="textTertiary">
                  {item.type}
                </Typography>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          />
        ) : null}

        {surfaceState === "no-results" ? (
          <ContentFallbackState
            testID="search-no-results"
            variant="empty"
            title="No results found"
            message="Try another keyword or switch to a different filter."
          />
        ) : null}

        <Typography variant="caption" color="textSecondary">
          {`${buildSearchScreenSnapshot({ query, activeFilter, recents, results, isSearching }).resultCount} results`}
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
  },
  resultItem: {
    borderWidth: 1,
    minHeight: 44,
    justifyContent: "center",
    gap: 2,
  },
});
