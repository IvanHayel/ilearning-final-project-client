import React, {useEffect}             from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ROUTE_PARAMETER, ROUTE_URL}   from "../../Constants";
import {signInOAuth2}                 from "../../Services";

export const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get(ROUTE_PARAMETER.OAUTH2.TOKEN);
  useEffect(() => {
    const authenticateUser = async () => {
      await signInOAuth2(token)
    };
    token && authenticateUser();
    navigate(ROUTE_URL.HOME);
  }, [token, navigate]);
  return <></>;
};
