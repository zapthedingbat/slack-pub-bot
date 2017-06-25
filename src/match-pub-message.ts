const rx = /(^|[\s:])(windmill|drink|drink|beer|pub|pint)([\s?:]|$)/i;

export default function matchPubMessage(text: string) {
  return rx.test(text);
}