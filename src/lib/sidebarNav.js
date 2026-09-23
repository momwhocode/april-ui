function flattenNavItem(item) {
  const nested = [
    ...(item.children || []),
    ...(item.nestedGroups || []).flatMap((group) => group.items || []),
  ];
  return [item, ...nested.flatMap(flattenNavItem)];
}

export function flattenSidebarItems({ topItems = [], groups = [], bottomItems = [] } = {}) {
  return [
    ...topItems.flatMap(flattenNavItem),
    ...groups.flatMap((group) => (group.items || []).flatMap(flattenNavItem)),
    ...bottomItems.flatMap(flattenNavItem),
  ];
}
