const STORAGE_KEY = 'linuxxing:lab:v1';

export type LabProgress = Record<string, boolean>;

export const loadLabProgress = (): LabProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LabProgress) : {};
  } catch {
    return {};
  }
};

export const saveLabProgress = (progress: LabProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
};
