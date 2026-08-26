# linuxxing

Explains Linux commands and scripts.

## Lab

The lab page boots a real Linux kernel in the browser with v86 compiled to WebAssembly. The emulator artifacts and the BusyBox kernel image live outside git: `pnpm run lab:assets` downloads them into `public/lab/`, and `pnpm run dev` and `pnpm run build` call it first.
