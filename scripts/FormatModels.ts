import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {
  AttributeType,
  StatType,
  WeaponType,
  AttributeAliasMap,
  WeaponAliasMap,
  StatAliasMap,
  DamageTypes,
  StatBreakpoint,
  WeaponDamagesDTO,
  DamagesDTO,
  StatsDTO,
  AttributesDTO,
  defaultAttributesDTO,
  defaultStatsDTO,
  defaultWeaponDamagesDTO,
  defaultDamagesDTO,
  JsonStatModel,
  JsonStatRow,
  JsonStatAttackPowers,
  JsonStat,
} from '../src/State/Stats/Models/StatModels';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = path.join(__dirname, '/data/TLBaseMainStat.json');
const attributeBreakpointsOutputPath = path.join(__dirname, '../src/State/Stats/Data/AttributeBreakpoints.json');
const statBreakpointsOutputPath = path.join(__dirname, '../src/State/Stats/Data/StatBreakpoints.json');

const rawData = fs.readFileSync(inputFilePath, 'utf-8');
const data: JsonStatModel[] = JSON.parse(rawData);
const levels: JsonStatRow[] = Object.values(data[0].Rows);

const attributesDto: AttributesDTO = defaultAttributesDTO();
const statsDto: StatsDTO = defaultStatsDTO();

// Sort by attribute, then by level
levels.sort((a: JsonStatRow, b: JsonStatRow): number => {
  let attributeDiff = AttributeAliasMap[b.Type.slice(15)] - AttributeAliasMap[a.Type.slice(15)];
  if (attributeDiff !== 0) {
    return attributeDiff;
  }
  return a.Point - b.Point;
});

let prevEntry: JsonStatRow | null = null;
for (let entry of levels) {
  const level = entry.Point;
  if (level <= 10
    || entry.Type !== prevEntry?.Type) {
    prevEntry = entry;
    continue;
  }

  const rawAttributeSliced = entry.Type.slice(15);
  if (!(rawAttributeSliced in AttributeAliasMap)) {
    console.log(`Attribute ${rawAttributeSliced} (full: ${entry.Type}) not found in AttributeAliasMap`);
    throw new Error('Attribute not found in AttributeAliasMap');
  }
  const attribute: AttributeType = AttributeAliasMap[rawAttributeSliced]

  for (let weaponKey in entry.Stat.AttackPowers) {
    let curr: number = entry.Stat.AttackPowers[weaponKey];

  }
  for (let weaponKey in WeaponAliasMap) {
    let curr: number = entry.Stat.AttackPowers[weaponKey];
    let prev: number = prevEntry.Stat.AttackPowers[weaponKey];
    if (curr > prev) {
      const breakpoint: StatBreakpoint = {
        Level: level,
        Value: curr,
        Attribute: attribute,
      };
      attributesDto[attribute]
        .DamageStats[DamageTypes.MaxDamage][WeaponAliasMap[weaponKey]]
        .push(breakpoint);
      statsDto
        .DamageStats[DamageTypes.MaxDamage][WeaponAliasMap[weaponKey]]
        .push(breakpoint);
    }

    let currBonus: number = entry.Stat.BonusAttackPowers[weaponKey];
    let prevBonus: number = prevEntry.Stat.BonusAttackPowers[weaponKey];
    if (currBonus > prevBonus) {
      const breakpoint: StatBreakpoint = {
        Level: level,
        Value: currBonus,
        Attribute: attribute,
      };
      attributesDto[attribute]
        .DamageStats[DamageTypes.BaseDamage][WeaponAliasMap[weaponKey]]
        .push(breakpoint);
      statsDto
        .DamageStats[DamageTypes.BaseDamage][WeaponAliasMap[weaponKey]]
        .push(breakpoint);
    }
  }

  for (let statKey in StatAliasMap) {
    let curr: number = entry.Stat[statKey];
    let prev: number = prevEntry.Stat[statKey];
    if (curr > prev) {
      const breakpoint: StatBreakpoint = {
        Level: level,
        Value: curr,
        Attribute: attribute,
      };
      attributesDto[attribute]
        .OtherStats[StatAliasMap[statKey]]
        .push(breakpoint);
      statsDto
        .OtherStats[StatAliasMap[statKey]]
        .push(breakpoint);
    }
  }

  prevEntry = entry;
};

fs.writeFileSync(attributeBreakpointsOutputPath, JSON.stringify(attributesDto, null, 2), 'utf-8');
fs.writeFileSync(statBreakpointsOutputPath, JSON.stringify(statsDto, null, 2), 'utf-8');

console.log(`Formatting complete. Output written to ${attributeBreakpointsOutputPath} and ${statBreakpointsOutputPath}`);
