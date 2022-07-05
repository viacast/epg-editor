import { useCallback, useEffect } from 'react';

function getScrollParent(node: Element | null): Element {
  if (!node) {
    return document.scrollingElement || document.documentElement;
  }

  const regex = /(auto|scroll)/;
  const parents = (_node, ps) => {
    if (_node.parentNode === null) {
      return ps;
    }
    return parents(_node.parentNode, ps.concat([_node]));
  };

  const style = (_node, prop) =>
    getComputedStyle(_node, null).getPropertyValue(prop);
  const overflow = _node =>
    style(_node, 'overflow') +
    style(_node, 'overflow-y') +
    style(_node, 'overflow-x');
  const scroll = _node => regex.test(overflow(_node));

  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return document.scrollingElement || document.documentElement;
  }

  const ps = parents(node.parentNode, []);

  for (let i = 0; i < ps.length; i += 1) {
    if (scroll(ps[i])) {
      return ps[i];
    }
  }

  return document.scrollingElement || document.documentElement;
}

export interface UseScrollIntoViewOptions extends ScrollToOptions {
  ref: React.RefObject<HTMLElement> | null;
  onMounted?: boolean | number;
}

export default function useScrollIntoView({
  ref,
  onMounted,
  behavior = 'smooth',
}: UseScrollIntoViewOptions): (options?: ScrollToOptions) => void {
  const scrollIntoView = useCallback(
    (options?: ScrollToOptions) => {
      if (!ref?.current) {
        return;
      }
      const parent = getScrollParent(ref.current) as HTMLElement;
      const { y, height: parentHeight } = parent.getBoundingClientRect();
      const { height } = ref.current.getBoundingClientRect();
      const top =
        (ref.current?.offsetTop ?? 0) - y - parentHeight / 2 + height / 2;
      parent.scrollTo(
        options ?? {
          behavior,
          top,
        },
      );
    },
    [behavior, ref],
  );

  useEffect(() => {
    if (!onMounted) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    const delay = typeof onMounted === 'number' ? onMounted : 500;
    const timeout = setTimeout(() => {
      scrollIntoView();
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrollIntoView;
}
