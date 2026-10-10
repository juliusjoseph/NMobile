// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { supabase } from "../src/lib/supabase";
// import { Session } from "@supabase/supabase-js";

// type AuthData = {
//   session: Session | null;
//   loading: boolean;
//   profile: any
// };

// const AuthContext = createContext<AuthData>({
//   session: null,
//   loading: true,
//   profile:null
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null)
//   useEffect(() => {
//     const fetchSession = async () => {
//       const { data: {session} } = await supabase.auth.getSession();
//       setSession(session);

// if (session) {
//   // fetch profile
//   const { data } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', session.user.id)
//     .single();
//   setProfile(data || null);
// }
//  setLoading(false);
//     };

//     fetchSession();
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);
//   return (
//     <AuthContext.Provider value={{ session, loading, profile }}>
//       {children}{" "}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { supabase } from "../src/lib/supabase";
// import { Session } from "@supabase/supabase-js";

// type AuthData = {
//   session: Session | null;
//   loading: boolean;
//   profile: any;
// };

// const AuthContext = createContext<AuthData>({
//   session: null,
//   loading: true,
//   profile: null,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setSession(session);

//       if (session) {
//         // fetch profile
//         const { data } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single();
//         setProfile(data || null);
//       }

//       setLoading(false);
//     };

//     fetchSession();

//     // Listen for auth state changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session);

//       if (session) {
//         // Fetch profile when auth state changes and session exists
//         const { data } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single();
//         setProfile(data || null);
//       } else {
//         setProfile(null);
//       }

//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, loading, profile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../src/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any;
  refreshProfile: () => void; // Add function to refresh profile
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  refreshProfile: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (session?.user?.id) {
      await fetchProfile(session.user.id);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        if (session?.user?.id) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user?.id) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, profile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
