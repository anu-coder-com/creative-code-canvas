// Resolve theme colors for OGL, whose Color parser accepts hex rather than CSS variables.
export function resolveTokenColor(color: string, host: HTMLElement): string {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d');
  if (!context) return getComputedStyle(host).getPropertyValue('--foreground').trim();
  const probe = document.createElement('span');
  probe.style.color = color;
  host.appendChild(probe);
  context.fillStyle = getComputedStyle(probe).color;
  probe.remove();
  context.fillRect(0, 0, 1, 1);
  const pixel = context.getImageData(0, 0, 1, 1).data;
  return '#' + Array.from(pixel.slice(0, 3)).map(channel => channel.toString(16).padStart(2, '0')).join('');
}