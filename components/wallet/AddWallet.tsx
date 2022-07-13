import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { useAddWallet } from "@components/wallet/AddWalletContext";
import { useWallet } from "@components/wallet/WalletContext";
import { Address } from "@components/wallet/Address";
import ProviderListing from "./ProviderListing";
import Nautilus from "./Nautilus";
import MobileWallet from "./MobileWallet";
import axios from "axios";

const WALLET_ADDRESS = "wallet_address";
export const WALLET_ADDRESS_LIST = "wallet_address_list";
const DAPP_CONNECTED = "dapp_connected";
const JWT_TOKEN_LOGIN = "jwt_token_login_422";

/**
 * Note on es-lint disable line:
 *
 * Ergo dApp injector uses global variables injected from the browser,
 * es-lint will complain if we reference un defined varaibles.
 *
 * Injected variables:
 * - ergo
 * - window.ergo_check_read_access
 * - window.ergo_request_read_access
 */
export const AddWallet: React.FC = () => {
  const [walletInput, setWalletInput] = React.useState("");
  const { addWalletOpen, setAddWalletOpen } = useAddWallet();
  const { wallet, setWallet, dAppWallet, setDAppWallet } = useWallet();
  const [init, setInit] = React.useState(false);

  /**
   * dapp state
   *
   * loading: yoroi is slow so need to show a loader for yoroi
   * dAppConnected: true if permission granted (persisted in local storage)
   * dAppError: show error message
   * dAppAddressTableData: list available addresses from wallet
   */
  const [loading, setLoading] = React.useState(false);
  const [dAppError, setDAppError] = React.useState(false);
  const [dAppAddressTableData, setdAppAddressTableData] = React.useState([]); // table data
  const [view, setView] = React.useState<string>(
    wallet !== "" && !dAppWallet.connected
      ? "mobile"
      : wallet !== "" && dAppWallet.connected
      ? "nautilus"
      : "listing"
  );

  React.useEffect(() => {
    // load primary address
    if (localStorage.getItem(WALLET_ADDRESS)) {
      setWallet(localStorage.getItem(WALLET_ADDRESS));
      setWalletInput(localStorage.getItem(WALLET_ADDRESS));
    }
    // load dApp state
    if (
      localStorage.getItem(DAPP_CONNECTED) &&
      localStorage.getItem(WALLET_ADDRESS_LIST)
    ) {
      setDAppWallet({
        connected:
          localStorage.getItem(DAPP_CONNECTED) === "true" ? true : false,
        addresses: JSON.parse(localStorage.getItem(WALLET_ADDRESS_LIST)),
      });
    }
    // refresh connection
    try {
      if (localStorage.getItem(DAPP_CONNECTED) === "true") {
        //@ts-ignore
        window.ergo_check_read_access().then((res) => {
          if (!res)
            //@ts-ignore
            window.ergo_request_read_access().then((res) => {
              if (!res) clearWallet();
            });
        });
      }
    } catch (e) {
      console.log(e);
    }
    setInit(true);
  }, []);

  /**
   * update persist storage
   */
  React.useEffect(() => {
    if (init) {
      localStorage.setItem(DAPP_CONNECTED, dAppWallet.connected);
      localStorage.setItem(
        WALLET_ADDRESS_LIST,
        JSON.stringify(dAppWallet.addresses)
      );
    }
  }, [dAppWallet, init]);

  React.useEffect(() => {
    if (init) localStorage.setItem(WALLET_ADDRESS, wallet);
  }, [wallet, init]);

  const handleClose = () => {
    // reset unsaved changes
    handleSubmitWallet();
    setDAppError(false);
  };

  const handleSubmitWallet = () => {
    // add read only wallet
    setAddWalletOpen(false);
    setWallet(walletInput);
    // clear dApp state
    setDAppError(false);
    setDAppWallet({
      connected: false,
      addresses: [],
    });
  };

  const clearWallet = () => {
    // clear state and local storage
    setWalletInput("");
    setWallet("");
    // clear dApp state
    setDAppError(false);
    setDAppWallet({
      connected: false,
      addresses: [],
    });
    localStorage.setItem(WALLET_ADDRESS, undefined);
    localStorage.setItem(WALLET_ADDRESS_LIST, undefined);
    localStorage.setItem(DAPP_CONNECTED, undefined);
  };

  const handleWalletFormChange = (e) => {
    setWalletInput(e.target.value);
  };

  /**
   * dapp connector
   */
  const dAppConnect = async () => {
    setLoading(true);
    try {
      //@ts-ignore
      if (await window.ergo_check_read_access()) {
        await dAppLoad();
        setLoading(false);
        return;
        //@ts-ignore
      } else if (await window.ergo_request_read_access()) {
        await dAppLoad();
        setLoading(false);
        return;
      }
      setDAppError(true);
    } catch (e) {
      setDAppError(true);
      console.log(e);
    }
    setLoading(false);
  };

  const dAppLoad = async () => {
    try {
      //@ts-ignore
      const address_used = await ergo.get_used_addresses();
      //@ts-ignore
      const address_unused = await ergo.get_unused_addresses();
      const addresses = [...address_used, ...address_unused];
      // use the first used address if available or the first unused one if not as default
      const address = addresses.length ? addresses[0] : "";
      // authenticate
      // todo: remove hardcoded endpoint
      const signingMessage = (await axios.post("http://localhost:8000/api/auth/login", { address: address })).data;
      // @ts-ignore
      const response = await ergo.auth(address, signingMessage.signingMessage);
      response.proof = Buffer.from(response.proof, 'hex').toString('base64');
      // jwt token store in local storage and do stuff
      // todo: handle failed case... show error message?
      const token = (await axios.post(signingMessage.tokenUrl, response)).data;
      sessionStorage.setItem(JWT_TOKEN_LOGIN, token.access_token);
      setWallet(address);
      setWalletInput(address);
      const addressData = addresses.map((address, index) => {
        return { id: index, name: address };
      });
      // update dApp state
      setDAppWallet({
        connected: true,
        addresses: addressData,
      });
      setDAppError(false);
    } catch (e) {
      console.log(e);
      // update dApp state
      setDAppWallet({
        connected: false,
        addresses: [],
      });
      setDAppError(true);
    }
  };

  const changeWalletAddress = (address) => {
    setWallet(address);
    setWalletInput(address);
  };

  let loadAddresses = async () => {
    setLoading(true);
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
      setDAppWallet({
        ...dAppWallet,
        addresses: addressData,
      });
      setdAppAddressTableData(addressData);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setWallet(localStorage.getItem(WALLET_ADDRESS));
    if (localStorage.getItem(WALLET_ADDRESS_LIST)) {
      setDAppWallet({
        connected: true,
        addresses: JSON.parse(localStorage.getItem(WALLET_ADDRESS_LIST)),
      });
    }
  }, [view]);

  return (
    <>
      <Dialog open={addWalletOpen} onClose={() => setAddWalletOpen(false)}>
        <DialogTitle sx={{ backgroundColor: "fileInput.main" }}>
          Connect Wallet
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "fileInput.main" }}>
          <DialogContentText sx={{ fontSize: ".9rem" }}>
            Your private key will never be stored on our server. If you are
            using a dapp wallet, please make sure only one wallet is enabled.
            Enabling multiple wallet extensions willl cause undefined behavior.
          </DialogContentText>
          {view === "listing" ? (
            <ProviderListing set={setView} />
          ) : view === "nautilus" ? (
            <Nautilus
              set={() => setView("listing")}
              connect={dAppConnect}
              wallet={wallet}
              connected={dAppWallet.connected}
              addresses={dAppWallet.addresses}
              setWallet={setWallet}
              load={loadAddresses}
              setLoading={setLoading}
              setDAppWallet={setDAppWallet}
              dAppWallet={dAppWallet}
              setdAppAddressTableData={setdAppAddressTableData}
            />
          ) : (
            <MobileWallet
              set={() => setView("listing")}
              wallet={walletInput}
              setWallet={setWalletInput}
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "fileInput.main",
            pl: "1rem",
            pr: "1rem",
            pb: ".5rem",
          }}
        >
          <Button onClick={() => setAddWalletOpen(false)} sx={{ mr: "1rem" }}>
            Close
          </Button>

          <Box sx={{ ml: "auto" }}>
            {wallet !== "" && (
              <Button
                color="error"
                variant="outlined"
                sx={{ mr: view === "mobile" ? ".5rem" : 0 }}
                onClick={() => {
                  setWallet("");

                  clearWallet();
                }}
              >
                Disconnect
              </Button>
            )}
            {view === "mobile" && (
              <Button
                onClick={handleClose}
                disabled={walletInput === ""}
                variant="contained"
              >
                Confirm
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

function isAddressValid(address) {
  try {
    return new Address(address).isValid();
  } catch (_) {
    return false;
  }
}

export default AddWallet;
