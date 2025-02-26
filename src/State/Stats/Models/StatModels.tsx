export enum AttributeType {
  'Strength',
  'Dexterity',
  'Wisdom',
  'Perception',
  'Fortitude',
};

export const AttributeAliasMap = {
  'STR': AttributeType.Strength,
  'DEX': AttributeType.Dexterity,
  'INT': AttributeType.Wisdom,
  'PER': AttributeType.Perception,
  'CON': AttributeType.Fortitude,
};

export enum WeaponType {
  'Dagger',
  'Sword',
  'Crossbow',
  'Greatsword',
  'Staff',
  'Bow',
  'Wand',
  'Spear',
};

export const WeaponAliasMap = {
  'DaggerAttackPower': WeaponType.Dagger,
  'SwordAttackPower': WeaponType.Sword,
  'CrossbowAttackPower': WeaponType.Crossbow,
  'Sword2hAttackPower': WeaponType.Greatsword,
  'StaffAttackPower': WeaponType.Staff,
  'BowAttackPower': WeaponType.Bow,
  'WandAttackPower': WeaponType.Wand,
  'SpearAttackPower': WeaponType.Spear,
};

export enum StatType {
  'MeleeHitChance',
  'RangedHitChance',
  'MagicHitChance',
  'MeleeEvasion',
  'RangedEvasion',
  'MagicEvasion',
  'MaxHealth',
  'HealthRegen',
  'MaxMana',
  'ManaRegen',
  'MeleeCritChance',
  'RangedCritChance',
  'MagicCritChance',
  'MeleeDefense',
  'RangedDefense',
  'MagicDefense',
  'CooldownSpeed',
  'BuffDuration',
  'MeleeEndurance',
  'RangedEndurance',
  'MagicEndurance',
  'MeleeHeavyAttackEvasion',
  'RangedHeavyAttackEvasion',
  'MagicHeavyAttackEvasion',
  'CCResistance',
  'CCChance',
};

export const StatAliasMap = {
  'MeleeAccuracy': StatType.MeleeHitChance,
  'RangeAccuracy': StatType.RangedHitChance,
  'MagicAccuracy': StatType.MagicHitChance,
  'MeleeEvasion': StatType.MeleeEvasion,
  'RangeEvasion': StatType.RangedEvasion,
  'MagicEvasion': StatType.MagicEvasion,
  'HpMax': StatType.MaxHealth,
  'HpRegen': StatType.HealthRegen,
  'CostMax': StatType.MaxMana,
  'CostRegen': StatType.ManaRegen,
  'WeakenAccuracy': StatType.CCChance,
  'MeleeCriticalAttack': StatType.MeleeCritChance,
  'RangeCriticalAttack': StatType.RangedCritChance,
  'MagicCriticalAttack': StatType.MagicCritChance,
  'MeleeArmor': StatType.MeleeDefense,
  'RangeArmor': StatType.RangedDefense,
  'MagicArmor': StatType.MagicDefense,
  'SkillCooldownModifier': StatType.CooldownSpeed,
  'BuffGivenDurationModifier': StatType.BuffDuration,
  'MeleeCriticalDefense': StatType.MeleeEndurance,
  'RangeCriticalDefense': StatType.RangedEndurance,
  'MagicCriticalDefense': StatType.MagicEndurance,
  'MeleeDoubleDefense': StatType.MeleeHeavyAttackEvasion,
  'RangeDoubleDefense': StatType.RangedHeavyAttackEvasion,
  'MagicDoubleDefense': StatType.MagicHeavyAttackEvasion,
  'WeakenTolerance': StatType.CCResistance,
};

export enum DamageTypes {
  'MaxDamage',
  'BaseDamage',
};

export interface StatBreakpoint {
  'Level': number,
  'Value': number,
  'Attribute': AttributeType,
};

export interface WeaponDamagesDTO {
  [WeaponType.Dagger]: StatBreakpoint[],
  [WeaponType.Sword]: StatBreakpoint[],
  [WeaponType.Crossbow]: StatBreakpoint[],
  [WeaponType.Greatsword]: StatBreakpoint[],
  [WeaponType.Staff]: StatBreakpoint[],
  [WeaponType.Bow]: StatBreakpoint[],
  [WeaponType.Wand]: StatBreakpoint[],
  [WeaponType.Spear]: StatBreakpoint[],
}

export const defaultWeaponDamagesDTO = (): WeaponDamagesDTO => ({
  [WeaponType.Dagger]: [],
  [WeaponType.Sword]: [],
  [WeaponType.Crossbow]: [],
  [WeaponType.Greatsword]: [],
  [WeaponType.Staff]: [],
  [WeaponType.Bow]: [],
  [WeaponType.Wand]: [],
  [WeaponType.Spear]: [],
});

export interface DamagesDTO {
  [DamageTypes.BaseDamage]: WeaponDamagesDTO,
  [DamageTypes.MaxDamage]: WeaponDamagesDTO,
}

export const defaultDamagesDTO = (): DamagesDTO => ({
  [DamageTypes.BaseDamage]: defaultWeaponDamagesDTO(),
  [DamageTypes.MaxDamage]: defaultWeaponDamagesDTO(),
});

export interface StatsDTO {
  'DamageStats': DamagesDTO,
  'OtherStats': {
    [StatType.MeleeHitChance]: StatBreakpoint[],
    [StatType.RangedHitChance]: StatBreakpoint[],
    [StatType.MagicHitChance]: StatBreakpoint[],
    [StatType.MeleeEvasion]: StatBreakpoint[],
    [StatType.RangedEvasion]: StatBreakpoint[],
    [StatType.MagicEvasion]: StatBreakpoint[],
    [StatType.MaxHealth]: StatBreakpoint[],
    [StatType.HealthRegen]: StatBreakpoint[],
    [StatType.MaxMana]: StatBreakpoint[],
    [StatType.ManaRegen]: StatBreakpoint[],
    [StatType.CCChance]: StatBreakpoint[],
    [StatType.MeleeCritChance]: StatBreakpoint[],
    [StatType.RangedCritChance]: StatBreakpoint[],
    [StatType.MagicCritChance]: StatBreakpoint[],
    [StatType.MeleeDefense]: StatBreakpoint[],
    [StatType.RangedDefense]: StatBreakpoint[],
    [StatType.MagicDefense]: StatBreakpoint[],
    [StatType.CooldownSpeed]: StatBreakpoint[],
    [StatType.BuffDuration]: StatBreakpoint[],
    [StatType.MeleeEndurance]: StatBreakpoint[],
    [StatType.RangedEndurance]: StatBreakpoint[],
    [StatType.MagicEndurance]: StatBreakpoint[],
    [StatType.MeleeHeavyAttackEvasion]: StatBreakpoint[],
    [StatType.RangedHeavyAttackEvasion]: StatBreakpoint[],
    [StatType.MagicHeavyAttackEvasion]: StatBreakpoint[],
    [StatType.CCResistance]: StatBreakpoint[],
  },
};

export const defaultStatsDTO = (): StatsDTO => ({
  'DamageStats': defaultDamagesDTO(),
  'OtherStats': {
    [StatType.MeleeHitChance]: [],
    [StatType.RangedHitChance]: [],
    [StatType.MagicHitChance]: [],
    [StatType.MeleeEvasion]: [],
    [StatType.RangedEvasion]: [],
    [StatType.MagicEvasion]: [],
    [StatType.MaxHealth]: [],
    [StatType.HealthRegen]: [],
    [StatType.MaxMana]: [],
    [StatType.ManaRegen]: [],
    [StatType.CCChance]: [],
    [StatType.MeleeCritChance]: [],
    [StatType.RangedCritChance]: [],
    [StatType.MagicCritChance]: [],
    [StatType.MeleeDefense]: [],
    [StatType.RangedDefense]: [],
    [StatType.MagicDefense]: [],
    [StatType.CooldownSpeed]: [],
    [StatType.BuffDuration]: [],
    [StatType.MeleeEndurance]: [],
    [StatType.RangedEndurance]: [],
    [StatType.MagicEndurance]: [],
    [StatType.MeleeHeavyAttackEvasion]: [],
    [StatType.RangedHeavyAttackEvasion]: [],
    [StatType.MagicHeavyAttackEvasion]: [],
    [StatType.CCResistance]: [],
  },
});

export interface AttributesDTO {
  [AttributeType.Strength]: StatsDTO,
  [AttributeType.Dexterity]: StatsDTO,
  [AttributeType.Wisdom]: StatsDTO,
  [AttributeType.Perception]: StatsDTO,
  [AttributeType.Fortitude]: StatsDTO,
};

export const defaultAttributesDTO = (): AttributesDTO => ({
  [AttributeType.Strength]: defaultStatsDTO(),
  [AttributeType.Dexterity]: defaultStatsDTO(),
  [AttributeType.Wisdom]: defaultStatsDTO(),
  [AttributeType.Perception]: defaultStatsDTO(),
  [AttributeType.Fortitude]: defaultStatsDTO(),
});

export interface JsonStatAttackPowers {
  "DaggerAttackPower": number,
  "SwordAttackPower": number,
  "CrossbowAttackPower": number,
  "Sword2hAttackPower": number,
  "StaffAttackPower": number,
  "BowAttackPower": number,
  "WandAttackPower": number,
  "SpearAttackPower": number,
};

export interface JsonStat {
  "AttackPowers": JsonStatAttackPowers,
  "BonusAttackPowers": JsonStatAttackPowers,
  "AttackSpeedModifier": number,
  "AttackSpeedMainHand": number,
  "MeleeAccuracy": number,
  "RangeAccuracy": number,
  "MagicAccuracy": number,
  "MeleeEvasion": number,
  "RangeEvasion": number,
  "MagicEvasion": number,
  "HpMax": number,
  "HpRegen": number,
  "CostMax": number,
  "CostRegen": number,
  "WeakenAccuracy": number,
  "StunAccuracy": number,
  "PetrificationAccuracy": number,
  "SleepAccuracy": number,
  "SilenceAccuracy": number,
  "BindAccuracy": number,
  "BlindAccuracy": number,
  "CollideAmplification": number,
  "MeleeCriticalAttack": number,
  "RangeCriticalAttack": number,
  "MagicCriticalAttack": number,
  "MeleeArmor": number,
  "RangeArmor": number,
  "MagicArmor": number,
  "SkillCooldownModifier": number,
  "BuffGivenDurationModifier": number,
  "MeleeCriticalDefense": number,
  "RangeCriticalDefense": number,
  "MagicCriticalDefense": number,
  "MeleeDoubleDefense": number,
  "RangeDoubleDefense": number,
  "MagicDoubleDefense": number,
  "SkillPowerResistance": number,
  "WeakenTolerance": number,
  "StunTolerance": number,
  "PetrificationTolerance": number,
  "SleepTolerance": number,
  "SilenceTolerance": number,
  "BindTolerance": number,
  "BlindTolerance": number,
  "CollideResistance": number,
}

export interface JsonStatRow {
  "Point": number,
  "Type": string,
  "Stat": JsonStat,
};

export interface JsonStatModel {
  'Rows': {
    [key: string]: JsonStatRow,
  },
};
