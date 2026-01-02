import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/components/DinoGame/index.tsx',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default',
      banner: "'use client';"
    },
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: true,
      banner: "'use client';"
    }
  ],
  plugins: [
    peerDepsExternal(), // Automatically externalize peerDependencies
    resolve({
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'build',
      outDir: 'build',
      include: ['src/components/**/*'],
      exclude: ['src/lib.tsx', '**/*.test.tsx', '**/*.test.ts']
    }),
    postcss({
      inject: true, // Inject CSS into JS instead of extracting
      minimize: true,
      modules: false
    })
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'] // Ensure React is external
};
