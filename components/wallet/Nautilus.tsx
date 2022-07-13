import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import * as React from "react";
import nautilus from "@public/icons/nautilus.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { WALLET_ADDRESS_LIST } from "./AddWallet";

const Nautilus: React.FC<{
  set: Function;
  connect: Function;
  wallet: string;
  connected: boolean;
  addresses: any[];
  setWallet: Function;
  load: Function;
  setLoading: Function;
  setDAppWallet: Function;
  dAppWallet: any;
  setdAppAddressTableData: Function;
}> = (props) => {
  const [wallet, setWallet] = React.useState<string>(props.wallet);
  React.useEffect(() => {
    const load = async () => {
      props.setLoading(true);
      try {
        //@ts-ignore
        const address_used = await ergo.get_used_addresses();
        //@ts-ignore
        const address_unused = await ergo.get_unused_addresses();
        const addresses = [...address_used, ...address_unused];
        console.log(addresses);
        const addressData = addresses.map((address, index) => {
          return { id: index, name: address };
        });
        props.setDAppWallet({
          ...props.dAppWallet,
          addresses: addressData,
        });
        props.setdAppAddressTableData(addresses);
        localStorage.setItem(WALLET_ADDRESS_LIST, JSON.stringify(addressData));
      } catch (e) {
        console.log(e);
      }
      props.setLoading(false);
    };
    if (wallet === "" && props.connected) {
      const connect = async () => await props.connect();
      connect().then(() => setTimeout(load, 1000));
    }
  }, [wallet]);

  React.useEffect(() => {
    setWallet(props.wallet);
  }, [props.wallet]);
  return (
    <Box sx={{ width: "100%" }}>
      {props.wallet !== "" ? (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              fontSize: "1.5rem",
              mt: "1rem",
            }}
          >
            <CheckCircleIcon
              color="primary"
              sx={{ fontSize: "3rem", mr: "1rem" }}
            />
            Wallet successfully connected!
          </Box>
          <Box sx={{ mt: ".5rem", fontSize: ".9rem", mb: ".5rem" }}>
            Select which address you want to use as as the default.
          </Box>
          <TextField
            label="Default Wallet Address"
            sx={{ width: "100%", mt: ".75rem" }}
            value={wallet}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {wallet !== "" && <CheckCircleIcon color="success" />}
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              width: "100%",
              border: "1px solid",
              borderColor: "border.main",
              borderRadius: ".3rem",
              mt: "1rem",
              maxHeight: "12rem",
              overflowY: "auto",
            }}
          >
            {props.addresses !== undefined &&
              props.addresses.map((i: any, c: number) => {
                console.log(i);
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      fontSize: ".7rem",
                      pl: ".5rem",
                      mt: ".5rem",
                      pb: ".5rem",
                      borderBottom:
                        c === props.addresses.length - 1 ? 0 : "1px solid",
                      borderBottomColor: "border.main",
                    }}
                    key={`${i.name}-address-selector`}
                  >
                    {i.name}
                    <Button
                      sx={{ ml: "auto", mr: ".5rem" }}
                      variant="contained"
                      color={wallet === i.name ? "success" : "primary"}
                      size="small"
                      onClick={() => {
                        setWallet(i.name);
                        props.setWallet(i.name);
                      }}
                    >
                      {wallet === i.name ? "Active" : "Choose"}
                    </Button>
                  </Box>
                );
              })}
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: "1rem",
              width: "100%",
              backgroundColor: "primary.lightOpacity",
              p: "1rem",
              borderRadius: ".5rem",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Avatar
              src={nautilus.src}
              sx={{ height: "3rem", width: "3rem", mr: "1rem" }}
            />
            <Box sx={{ fontSize: "1.2rem", color: "text.main" }}>
              Nautilus
              <Box
                sx={{ fontSize: ".9rem", color: "text.light", mt: "-.25rem" }}
              >
                Connect automatically signing with your wallet
              </Box>
            </Box>
            <Button
              sx={{ ml: "auto" }}
              size="small"
              onClick={() => props.set()}
            >
              Change
            </Button>
          </Box>
          <Box sx={{ mt: ".5rem", fontSize: ".9rem" }}>
            Follow the instructions in your Nautilus Wallet to confirm and you
            will connect your wallet instantly. If a popup box is not appearing
            or if you accidentally closed it, please{" "}
            <Box
              sx={{
                cursor: "pointer",
                display: "inline",
                textDecoration: "underline",
                color: "primary.main",
              }}
              onClick={() => {
                const load = async () => {
                  props.setLoading(true);
                  try {
                    //@ts-ignore
                    const address_used = await ergo.get_used_addresses();
                    //@ts-ignore
                    const address_unused = await ergo.get_unused_addresses();
                    const addresses = [...address_used, ...address_unused];
                    const addressData = addresses.map((address, index) => {
                      return { id: index, name: address };
                    });
                    props.setDAppWallet({
                      ...props.dAppWallet,
                      addresses: addressData,
                    });
                    props.setdAppAddressTableData(addressData);
                  } catch (e) {
                    console.log(e);
                  }
                  props.setLoading(false);
                };
                const connect = async () => await props.connect();
                connect().then(() => load());
              }}
            >
              click here
            </Box>{" "}
            to open it again
          </Box>
        </>
      )}
    </Box>
  );
};

export default Nautilus;
