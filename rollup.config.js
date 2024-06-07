export default [
    {
        input: './src/main.js',
        output: {
            file: 'dist/rufs.umd.js',
            format: 'umd',
            name: 'fw',
        }
    },
    {
        input: './src/main.js',
        output: {
            file: 'dist/rufs.esm.js',
            format: 'esm',
        }
    },
    {
        input: './src/main.js',
        output: {
            file: 'dist/rufs.cjs.js',
            format: 'cjs',
        }
    },
];