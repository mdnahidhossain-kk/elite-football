# Quick Start Guide: Phase 1 — Foundation & Design System

**Purpose**: Get a developer up and running with the Elite Football app structure in < 10 minutes (Constitution SC-009)  
**Audience**: Frontend engineers, designers, QA engineers  
**Prerequisites**: Node.js 18+, npm/yarn, Expo CLI  
**Target**: iOS 15+ simulator or Android 8+ emulator

---

## 1️⃣ Prerequisites (2 minutes)

### Check Node.js version
```bash
node --version
# Expected: v18.0.0 or higher
# If not installed: https://nodejs.org/

npm --version
# Expected: v9.0.0 or higher
```

### Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli@latest
```

### Have an emulator/simulator ready
- **iOS**: Run `open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app` (requires Xcode)
- **Android**: Android Studio with emulator running, or use `expo-go` app on physical device

---

## 2️⃣ Clone & Install (3 minutes)

### Clone the repo
```bash
git clone https://github.com/SamerElhamdo/elite-football.git
cd elite-football
```

### Check out the feature branch
```bash
git checkout 001-foundation-design-system
```

### Install dependencies
```bash
npm install
# or: yarn install
```

### Verify installation completed successfully
```bash
npm run lint
# Expected output: "✓ ESLint checks passed"

npm run type-check
# Expected output: "✓ No TypeScript errors"
```

---

## 3️⃣ First Run (3 minutes)

### Start the development server
```bash
npm run dev
```

You'll see:
```
Expo DevTools is running at http://localhost:19002
Tunnel ready.
Press 'i' to open the iOS simulator
Press 'a' to open the Android emulator
Press 'w' to open the web preview (experimental)
```

### Open on iOS Simulator
```bash
# Press 'i' in the terminal, or:
npm run dev:ios
```

### Or open on Android Emulator
```bash
# Press 'a' in the terminal, or:
npm run dev:android
```

**Expected Result**: App loads with 5-tab bottom navigation (Matches · News · Leagues · Favorites · Search). Each tab shows a placeholder screen with "Coming Soon" or mock data.

---

## 4️⃣ Verify Project Structure (2 minutes)

### Check that path aliases work
```bash
# Verify that tsconfig.json has path aliases configured
cat tsconfig.json | grep -A 10 '"paths"'

# Expected:
# "paths": {
#   "@components/*": ["src/components/*"],
#   "@features/*": ["src/features/*"],
#   ...
# }
```

### Verify TypeScript strict mode
```bash
# Verify tsconfig.json has strict mode enabled
cat tsconfig.json | grep -A 5 '"compilerOptions"'

# Look for:
# "strict": true
# "noImplicitAny": true
# "strictNullChecks": true
```

### Verify folder structure exists
```bash
ls -la src/

# Expected:
# app.tsx
# tokens.ts
# components/           (atomic components: Button, Typography, etc.)
# features/             (domain screens: Matches, News, Leagues, etc.)
# navigation/           (React Navigation config)
# store/                (Zustand stores)
# hooks/                (custom hooks)
# utils/                (utilities)
# types/                (TypeScript types)
# theme/                (theme provider + useTheme hook)
# api/                  (API client, prepared for Phase 3)
# __tests__/            (tests)
```

---

## 5️⃣ Component Catalog (Dev Tool)

Access the Component Catalog to see all atomic components in both themes:

1. **Navigate in the app**:
   - Tap the "Leagues" tab
   - Tap the "🛠 Component Catalog" button (development tool)

2. **Verify all components are visible**:
   - Button (4 variants: primary, secondary, outline, ghost)
   - Typography (headings + body)
   - Input (states: default, error, disabled)
   - Avatar (sizes: small, medium, large)
   - Card (variants: default, elevated, flat)

3. **Theme toggle**:
   - Find "Settings" or theme toggle (usually top-right or in Settings tab)
   - Switch between Light and Dark themes
   - Observe that **all components instantly update** without page reload
   - ✅ This confirms theme switching is working

---

## 6️⃣ Performance Baseline (2 minutes)

### Open React Native Profiler
```bash
# In the terminal where 'npm run dev' is running:
# Press 'd' to open Developer Menu
# Select "Toggle Performance Monitor"
```

### Verify 60 FPS
1. Navigate to the Matches tab
2. Observe the **FPS counter** in the top-right corner
3. Scroll through the match list
4. **Expected**: FPS stays at ~60 (or close to it on mid-range devices)
5. **If <50 FPS**: Profiler may be enabled (slows performance); disable it and re-test

### Check bundle size
```bash
npm run build:preview

# Expected output:
# iOS bundle size: ~45–50 MB
# Android bundle size: ~50–60 MB
# (Note: These are uncompressed; final store builds are ~30/40 MB after app store optimization)
```

---

## 7️⃣ Linting & Formatting

### Run linting checks
```bash
npm run lint

# Expected: ✅ All linting checks pass
# If failures: npm run lint:fix (auto-fixes formatting issues)
```

### Run TypeScript type check
```bash
npm run type-check

# Expected: ✅ No TypeScript errors
```

### Run tests (Phase 1 subset)
```bash
npm test

# Runs unit + integration tests for:
# - Design tokens (colors, spacing, typography)
# - Theme switching
# - Navigation typing
# - Component rendering (snapshots)

# Expected: All tests pass
```

### Pre-commit hook verification
Try committing code that violates ESLint or Prettier:
```bash
# Edit a file to have bad formatting (e.g., extra spaces, bad indentation)
echo "const x =  1" > src/test.ts

git add src/test.ts
git commit -m "test: bad formatting"

# Expected: ❌ Commit rejected with linting error
# Fix with: npm run lint:fix
git add src/test.ts
git commit -m "test: bad formatting"

# Expected: ✅ Commit succeeds (after fixes applied)

# Clean up
git reset HEAD src/test.ts
rm src/test.ts
```

---

## 8️⃣ Next Steps

### If you're a **Frontend Developer**:
1. Branch off from `001-foundation-design-system` to a task branch (e.g., `001-t002-design-tokens`)
2. Follow the tasks in `specs/001-foundation-design-system/tasks.md` (to be generated)
3. Implement one task at a time
4. Run `npm run lint` + `npm test` before pushing
5. Open a PR for review

### If you're a **Designer**:
1. Access the Component Catalog (see section 5 above)
2. Verify color contrasts using a tool like WebAIM Contrast Checker (WCAG AA: ≥ 4.5:1)
3. Suggest design token refinements if needed (e.g., adjust colors for better brand fit)

### If you're a **QA/Tester**:
1. Clone the repo and run the app (sections 1–3 above)
2. Verify the 5-tab navigation works smoothly on both platforms
3. Test theme switching doesn't lose app state
4. Profile 60 FPS performance (section 6 above)
5. File bugs in GitHub Issues if regressions found

### If you're a **DevOps/Release Manager**:
1. Preview the build output: `npm run build:preview`
2. Monitor bundle size: should be <50MB (iOS), <60MB (Android)
3. Set up CI/CD pipeline to run `npm run lint && npm run type-check && npm test` on every PR
4. Stage builds to TestFlight / Google Play Internal Testing (Phase 23)

---

## ⚙️ Troubleshooting

### "Module not found: @components/Button"
**Cause**: Path aliases not correctly configured in `tsconfig.json`  
**Fix**: 
```bash
npm run type-check
# Should resolve after rebuilding
```

### "TypeScript errors: Object is possibly null"
**Cause**: `strictNullChecks` is enabled (correct for Constitution)  
**Fix**: Add type guard:
```typescript
if (value !== null && value !== undefined) {
  // Use value
}

// Or use optional chaining:
value?.property?.subproperty
```

### "App doesn't hot reload"
**Cause**: Metro bundler cache is stale  
**Fix**:
```bash
npm run dev -- --clear
# Or in developer menu (press 'd'), select "Clear cache"
```

### "FPS drops to 30–40 on Android"
- This is **expected on low-end devices** (Snapdragon 665 or lower)
- Use a mid-range device emulator (Snapdragon 695) for baseline testing
- Profiler enabled? Disable it (press 'd' → "Toggle Performance Monitor")
- If still slow: file a performance ticket with React Profiler export

### "Pre-commit hook blocks my commit"
**Cause**: Code violates ESLint or Prettier rules  
**Fix**:
```bash
npm run lint:fix
git add .
git commit -m "your message"
```

### "Out of memory during npm install"
**Cause**: Node heap too small  
**Fix**:
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm install
```

---

## 📚 Additional Resources

- **Design System**: [specs/001-foundation-design-system/data-model.md](data-model.md)
- **Architecture**: [specs/001-foundation-design-system/plan.md](../plan.md)
- **Navigation**: [specs/001-foundation-design-system/contracts/navigation.ts](contracts/navigation.ts)
- **Full Feature Spec**: [specs/001-foundation-design-system/spec.md](../spec.md)
- **Constitution**: [.specify/memory/constitution.md](.specify/memory/constitution.md)

---

## ✅ Verification Checklist

Before you declare setup complete:

- [ ] `npm install` completed without errors
- [ ] `npm run lint` passes (✓ ESLint checks passed)
- [ ] `npm run type-check` passes (✓ No TypeScript errors)
- [ ] App launches on iOS simulator / Android emulator
- [ ] Bottom tab navigation works (5 taps visible)
- [ ] Theme toggle switches Light ↔ Dark instantly
- [ ] Component Catalog displays all 5 components in both themes
- [ ] FPS counter shows ~60 fps when scrolling match list
- [ ] Pre-commit hook blocks commits with linting violations

**Setup Complete!** You're ready to start implementing tasks or contributing to the codebase.

---

**Last Updated**: 2025-04-17  
**Maintenance**: Update this guide after significant tooling or structure changes
