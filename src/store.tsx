import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Tx = { id: string; kind: string; title: string; detail: string; amount: number; date: string };
type Account = { first: string; last: string; hash: string; balance: number; tx: Tx[] };
type DB = { onboarded: boolean; session: string | null; accounts: Record<string, Account> };
export type User = { email: string; first: string; last: string; balance: number; tx: Tx[] };

const EMPTY: DB = { onboarded: false, session: null, accounts: {} };

// Demo only: a local stand-in for a backend, not real security.
const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return String(h);
};
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const norm = (e: string) => e.trim().toLowerCase();

type Store = {
  ready: boolean;
  onboarded: boolean;
  user: User | null;
  finishIntro: () => void;
  signUp: (first: string, last: string, email: string, pw: string) => string | null;
  signIn: (email: string, pw: string) => string | null;
  signOut: () => void;
  resetPassword: (email: string, pw: string) => string | null;
  updateName: (first: string, last: string) => void;
  fund: (amount: number) => void;
  pay: (kind: string, title: string, detail: string, amount: number) => { ok: boolean; id?: string };
};

const Ctx = createContext<Store>(null as unknown as Store);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DB>(EMPTY);
  const [ready, setReady] = useState(false);
  const ref = useRef<DB>(EMPTY);
  const commit = (next: DB) => { ref.current = next; setDb(next); };

  useEffect(() => {
    AsyncStorage.getItem("nm:db")
      .then((raw) => { if (raw) commit({ ...EMPTY, ...JSON.parse(raw) }); })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem("nm:db", JSON.stringify(db)).catch(() => {});
  }, [db, ready]);

  const api = useMemo<Store>(() => {
    const edit = (fn: (a: Account) => Account) => {
      const d = ref.current;
      const e = d.session;
      if (!e || !d.accounts[e]) return;
      commit({ ...d, accounts: { ...d.accounts, [e]: fn(d.accounts[e]) } });
    };
    const acc = db.session ? db.accounts[db.session] : undefined;
    return {
      ready,
      onboarded: db.onboarded,
      user: acc && db.session ? { email: db.session, first: acc.first, last: acc.last, balance: acc.balance, tx: acc.tx } : null,
      finishIntro: () => commit({ ...ref.current, onboarded: true }),
      signUp: (first, last, em, pw) => {
        const k = norm(em);
        const d = ref.current;
        if (d.accounts[k]) return "An account with this email already exists. Sign in instead.";
        const welcome: Tx = { id: uid(), kind: "Fund", title: "Welcome demo credit", detail: "Starter balance for the demo", amount: 20000, date: new Date().toISOString() };
        commit({ ...d, session: k, accounts: { ...d.accounts, [k]: { first, last, hash: hash(pw), balance: 20000, tx: [welcome] } } });
        return null;
      },
      signIn: (em, pw) => {
        const k = norm(em);
        const d = ref.current;
        const a = d.accounts[k];
        if (!a || a.hash !== hash(pw)) return "Email or password is incorrect.";
        commit({ ...d, session: k });
        return null;
      },
      signOut: () => commit({ ...ref.current, session: null }),
      resetPassword: (em, pw) => {
        const k = norm(em);
        const d = ref.current;
        const a = d.accounts[k];
        if (!a) return "No account found with this email.";
        commit({ ...d, accounts: { ...d.accounts, [k]: { ...a, hash: hash(pw) } } });
        return null;
      },
      updateName: (first, last) => edit((a) => ({ ...a, first, last })),
      fund: (amount) =>
        edit((a) => ({
          ...a,
          balance: a.balance + amount,
          tx: [{ id: uid(), kind: "Fund", title: "Wallet funded", detail: "Card payment (demo)", amount, date: new Date().toISOString() }, ...a.tx],
        })),
      pay: (kind, title, detail, amount) => {
        const d = ref.current;
        const a = d.session ? d.accounts[d.session] : undefined;
        if (!a || a.balance < amount) return { ok: false };
        const id = uid();
        edit((x) => ({
          ...x,
          balance: x.balance - amount,
          tx: [{ id, kind, title, detail, amount: -amount, date: new Date().toISOString() }, ...x.tx],
        }));
        return { ok: true, id };
      },
    };
  }, [db, ready]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
