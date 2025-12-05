#!/usr/bin/env node

/**
 * Reset Script for Whitespace Multi-Tenant Dashboard
 *
 * This script provides instructions for resetting dashboard data.
 * Since localStorage is a browser API, the actual reset must be done in the browser.
 *
 * Usage: node reset-data.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the mockDb.ts file to extract the STORAGE_KEY
const mockDbPath = join(__dirname, 'services', 'mockDb.ts');
const mockDbContent = readFileSync(mockDbPath, 'utf8');

const storageKeyMatch = mockDbContent.match(/const STORAGE_KEY = '([^']+)'/);
if (!storageKeyMatch) {
  console.error('❌ Could not find STORAGE_KEY in mockDb.ts');
  process.exit(1);
}

const STORAGE_KEY = storageKeyMatch[1];

console.log('🔄 Whitespace Dashboard Data Reset Instructions');
console.log('='.repeat(50));
console.log(`📍 Storage Key: ${STORAGE_KEY}`);
console.log('');
console.log('🚨 IMPORTANT: Reset must be done in the BROWSER, not Node.js!');
console.log('');
console.log('📋 Current Data Structure:');
console.log('   • GENERAL: 6 opportunities (truly cross-industry)');
console.log('   • MANUFACTURING: 7 opportunities');
console.log('   • EDTECH: 7 opportunities');
console.log('   • RETAIL: 6 opportunities');
console.log('   • MEDTECH: 6 opportunities');
console.log('   • FINTECH: 6 opportunities');
console.log('   • INSURTECH: 3 opportunities');
console.log('   • Plus other verticals...');
console.log('');

console.log('🔧 To Reset Dashboard Data:');
console.log('');
console.log('   METHOD 1 - Browser Console (Recommended):');
console.log('   1. Open your dashboard in the browser');
console.log('   2. Press F12 to open Developer Tools');
console.log('   3. Go to the Console tab');
console.log('   4. Copy and paste this exact command:');
console.log('');
console.log(`      localStorage.removeItem('${STORAGE_KEY}'); location.reload();`);
console.log('');
console.log('   METHOD 2 - Manual Browser Refresh:');
console.log('   1. Open your dashboard');
console.log('   2. Press F12 → Application tab → Local Storage');
console.log(`   3. Delete the key: ${STORAGE_KEY}`);
console.log('   4. Refresh the page');
console.log('');

console.log('✅ After reset, you should see:');
console.log('   • 11 vertical filter options (instead of 4)');
console.log('   • Only 6 opportunities in GENERAL category');
console.log('   • Properly categorized opportunities in specific verticals');
console.log('');

console.log('💡 Pro Tip: Run this script (node reset-data.js) whenever you');
console.log('   update the data structure to get the reset command!');