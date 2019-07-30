import { calculateSummaryData } from '../helpers';

describe('calculate summary data helper', () => {
  test('returns base case without errors when results are empty', () => {
    const results = {
      vmSummaryReportResult: { result_set: [] },
      envSummaryReportResult: { result_set: [] }
    };
    const summaryData = calculateSummaryData(results);
    expect(summaryData).toMatchSnapshot();
  });

  test('returns correct sums', () => {
    const results = {
      vmSummaryReportResult: {
        result_set: [
          {
            'ext_management_system.id': 1,
            'ext_management_system.name': 'provider 1',
            allocated_disk_storage: 2000,
            mem_cpu: 1000,
            cpu_total_cores: 1
          },
          {
            'ext_management_system.id': 1,
            'ext_management_system.name': 'provider 1',
            allocated_disk_storage: 2000,
            mem_cpu: 1000,
            cpu_total_cores: 1
          },
          {
            'ext_management_system.id': 2,
            'ext_management_system.name': 'provider 2',
            allocated_disk_storage: 2000,
            mem_cpu: 1000,
            cpu_total_cores: 1
          }
        ]
      },
      envSummaryReportResult: {
        result_set: [
          {
            'ext_management_system.id': 1
          },
          {
            'ext_management_system.id': 2
          },
          {
            'ext_management_system.id': 2
          }
        ]
      }
    };
    const summaryData = calculateSummaryData(results);
    const sumsFromProviders = { numProviders: summaryData.providers.length };
    summaryData.providers.forEach(provider => {
      Object.keys(provider).forEach(key => {
        if (key !== 'id' && key !== 'name') {
          if (!sumsFromProviders[key]) sumsFromProviders[key] = 0;
          sumsFromProviders[key] += provider[key];
        }
      });
    });
    expect(sumsFromProviders).toEqual(summaryData.total);
    expect(summaryData.total.numProviders).toEqual(
      new Set(results.vmSummaryReportResult.result_set.map(vm => vm['ext_management_system.id'])).size
    );
    expect(summaryData.total.numHypervisors).toEqual(results.envSummaryReportResult.result_set.length);
    expect(summaryData).toMatchSnapshot();
  });
});
