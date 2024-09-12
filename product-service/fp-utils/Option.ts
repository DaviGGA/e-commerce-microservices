type Some<T> = {
  _tag: "Some",
  value: T
}

type None = {
  _tag: "None"
}

export type Option<T> = Some<T> | None;

export const some =  <T>(value: T): Option<T> => ({_tag: "Some", value});
export const none: Option<never> = {_tag: "None"}

export function match<T> (
  option: Option<T>, 
  someFn: (value: T) => T, 
  noneFn: () => T
): T {
  if (option._tag == "Some") {
    return someFn(option.value);
  }

  return noneFn();
}

