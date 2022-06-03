type Constructable = new (...args: any[]) => any;

/**
 * Helper function to merge two classes.
 * @see https://stackoverflow.com/a/56012111
 * @param class1 
 * @param class2 
 * @returns mergedClasses
 */
export const mergeClasses = <S extends Constructable, T extends Constructable>(
  class1: S,
  class2: T
) => <
  Si extends InstanceType<S> = InstanceType<S>,
  Ti extends InstanceType<T> = InstanceType<T>
>(
  args1: ConstructorParameters<S>,
  args2: ConstructorParameters<T>
): Si & Ti => {
  const obj1 = new class1(...args1);
  const obj2 = new class2(...args2);
  for (const p in obj2) {
    obj1[p] = obj2[p];
  }
  return obj1 as Si & Ti;
};
