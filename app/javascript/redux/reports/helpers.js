export const concatPreservingUniqueIds = (currentSet, newElements) => {
  const newIds = newElements.map(elem => elem.id);
  const currentSetWithConflictsRemoved = currentSet.filter(elem => !newIds.includes(elem.id));
  return [...currentSetWithConflictsRemoved, ...newElements];
};
