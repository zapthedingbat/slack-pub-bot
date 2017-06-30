const rx = /(^|[\s:])(windmill|drink|pie\s?horse|beer|pub|pint)([\s?:]|$)/i;

export default function matchPubMessage(text: string) {
  return rx.test(text);
}
