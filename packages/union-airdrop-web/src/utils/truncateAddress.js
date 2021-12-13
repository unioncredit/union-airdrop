export default function truncateAddress(address, size = 4) {
  if (!address) return null;

  return `${address.slice(0, size + 2)}...${address.slice(-size)}`;
}
