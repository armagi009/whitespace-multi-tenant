# Whitespace Multi-Tenant Dashboard

## Data Management

### Resetting Dashboard Data

When you make structural changes to the opportunity data (adding new verticals, recategorizing opportunities, updating geography values, etc.), the dashboard may still be showing cached data from localStorage.

#### **Quick Reset (Easiest)**
Click the red "🔄 Reset Data" button in the dashboard (temporary - remove after use).

#### **Script-Based Reset**
```bash
# Get reset instructions
node reset-data.js

# Then follow the browser console instructions provided
```

#### **Manual Browser Reset**
1. Open browser dev tools (F12)
2. Go to Console tab
3. Run: `localStorage.removeItem("whitespace_db_v1"); location.reload();`

### What the Reset Does

- ✅ Clears cached data in localStorage
- ✅ Forces dashboard to reload from updated `INITIAL_DB`
- ✅ Shows new vertical categories (11 total now!)
- ✅ Displays properly recategorized opportunities

### Current Data Structure (After Reset)

```
GENERAL: 6 opportunities (truly cross-industry only)
MANUFACTURING: 7 opportunities
EDTECH: 7 opportunities
RETAIL: 6 opportunities
MEDTECH: 6 opportunities
FINTECH: 6 opportunities
INSURTECH: 3 opportunities
GOVTECH: 2 opportunities
AGRITECH: 2 opportunities
LOGISTICS: 1 opportunity
CLEANTECH: 1 opportunity
```

### When to Reset

Run reset whenever you:
- ✅ Add new vertical categories to `types.ts`
- ✅ Recategorize opportunities from GENERAL to specific verticals
- ✅ Update geography values or other data structure changes
- ✅ Modify the `INITIAL_DB` in `mockDb.ts`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```