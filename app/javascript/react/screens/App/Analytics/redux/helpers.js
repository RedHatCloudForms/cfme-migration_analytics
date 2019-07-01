export const calculateSummaryData = vmSummaryReportResult => {
  const valuesByProviderId = {};

  vmSummaryReportResult.result_set.forEach(vm => {
    const {
      'ext_management_system.id': providerId,
      'ext_management_system.name': providerName,
      'host.name': hypervisorName,
      allocated_disk_storage: allocatedDiskSpace,
      mem_cpu: allocatedMemory,
      cpu_total_cores: numCpuCores
    } = vm;
    if (!valuesByProviderId[providerId]) {
      valuesByProviderId[providerId] = {
        id: providerId,
        name: providerName,
        hypervisorNames: new Set(),
        numHypervisors: 0,
        numVms: 0,
        allocatedDiskSpace: 0,
        allocatedMemory: 0,
        numCpuCores: 0
      };
    }
    const provider = valuesByProviderId[providerId];
    provider.hypervisorNames.add(hypervisorName);
    provider.numHypervisors = provider.hypervisorNames.size;
    provider.numVms += 1;
    provider.allocatedDiskSpace += allocatedDiskSpace;
    provider.allocatedMemory += allocatedMemory;
    provider.numCpuCores += numCpuCores;
  });

  const total = {
    numProviders: Object.keys(valuesByProviderId).length,
    numHypervisors: 0,
    numVms: 0,
    allocatedDiskSpace: 0,
    allocatedMemory: 0,
    numCpuCores: 0
  };

  Object.keys(valuesByProviderId).forEach(providerId => {
    const provider = valuesByProviderId[providerId];
    total.numHypervisors += provider.numHypervisors;
    total.numVms += provider.numVms;
    total.allocatedDiskSpace += provider.allocatedDiskSpace;
    total.allocatedMemory += provider.allocatedMemory;
    total.numCpuCores += provider.numCpuCores;
  });

  return {
    total,
    providers: Object.values(valuesByProviderId)
  };
};
