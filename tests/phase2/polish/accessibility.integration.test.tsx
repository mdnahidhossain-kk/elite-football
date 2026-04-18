import {
  buildAccessibleLabel,
  getAccessibleActionProps,
  getMinTapTargetStyle,
  MIN_TAP_TARGET_SIZE,
} from "../../../src/features/shared/accessibility/phase2A11y";

describe("Phase 2 cross-feature accessibility integration", () => {
  it("builds meaningful labels and role metadata across primary actions", () => {
    expect(buildAccessibleLabel("Leagues", "Category tab", "Top competitions")).toBe(
      "Leagues, Category tab, Top competitions"
    );
    expect(buildAccessibleLabel("Search", "", "Filter: News")).toBe("Search, Filter: News");

    expect(
      getAccessibleActionProps({
        label: "Open related article",
        hint: "Navigates to full article detail",
      })
    ).toEqual({
      accessibilityRole: "button",
      accessibilityLabel: "Open related article",
      accessibilityHint: "Navigates to full article detail",
      accessibilityState: { disabled: false },
    });
  });

  it("enforces minimum tap target sizing", () => {
    expect(getMinTapTargetStyle()).toMatchObject({
      minWidth: MIN_TAP_TARGET_SIZE,
      minHeight: MIN_TAP_TARGET_SIZE,
      justifyContent: "center",
      alignItems: "center",
    });
    expect(getMinTapTargetStyle(52)).toMatchObject({ minWidth: 52, minHeight: 52 });
  });
});
