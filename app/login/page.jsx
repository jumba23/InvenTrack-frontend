import supabaseClient from "../../utils/authentication/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const LoginForm = () => {
  return (
    <Auth
      supabaseClient={supabaseClient}
      appearance={{ theme: ThemeSupa }}
      providers={["google", "facebook", "twitter"]}
    />
  );
};

export default LoginForm;
