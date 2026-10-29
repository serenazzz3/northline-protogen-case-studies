import { cp, mkdir, rm } from 'node:fs/promises';

const target = process.argv[2] || 'portfolio';
if (!['portfolio', 'p301', 'p302', 'p303'].includes(target)) throw new Error(`Unknown build target: ${target}`);
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const item of ['index.html', 'p301', 'p302', 'p303', 'src']) {
  await cp(item, `dist/${item}`, { recursive: true });
}
if(target!=='portfolio')await cp(`${target}/index.html`,'dist/index.html');
console.log(`Built ${target} static site in dist/`);
