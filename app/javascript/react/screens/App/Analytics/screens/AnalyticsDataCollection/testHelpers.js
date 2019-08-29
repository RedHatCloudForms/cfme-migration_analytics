import { expectOnlySpecificActions } from '../../../../../../common/testReduxHelpers';

export const expectNoActionsOtherThan = (expectedActions, props) => {
  const allActions = ['startInventoryBundleAction', 'fetchBundleTaskAction', 'resetDataCollectionStateAction'];
  expectOnlySpecificActions({ allActions, expectedActions, props });
};
