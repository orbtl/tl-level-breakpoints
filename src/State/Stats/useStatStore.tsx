import { create } from 'zustand';
import statsObject from './TLBaseMainStat.json';
import { JsonStatRow } from './Models/StatModels';

function formatStats(rows: JsonStatRow[]) {
  const stats = rows.reduce((final: StatState, row: any) => {
    const statType = row['Type'].slice(15);
    if (!(statType in final)) {
      final[statType] = {};
    }
    return final;
  }, {});
  const stats = {};
  for (let row of Object.values(rows)) {
    if ()
  }
})

interface StatState {

}

const useStatStore = create<StatState>(set => {
  
});