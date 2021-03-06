import Edit from "@pages/dao/[id]/profile/edit";
import All from "@pages/dao/[id]/proposals/all";
import Following from "@pages/dao/[id]/proposals/following";
import Mine from "@pages/dao/[id]/proposals/mine";
import Past from "@pages/dao/[id]/proposals/past";
import EditNotifications from "@pages/dao/[id]/notifications/edit";
import Proposal from "@pages/dao/[id]/proposal/[proposal_id]";
import Discussion from "@pages/dao/[id]/discussion/[discussion_id]";
import Create from "@pages/dao/[id]/create";
import Vote from "@pages/dao/[id]/proposal/[proposal_id]/votes";
import CastVote from "@pages/dao/[id]/proposal/[proposal_id]/vote";
// import Member from "@pages/dao/[id]/member/[member_id]";
import CreateProposal from "@pages/dao/[id]/proposal/create";
import CreateDiscussion from "@pages/dao/[id]/discussion/create";
import Dashboard from "@components/dao/dashboard/Dashboard";
// import Profile from "@pages/dao/[id]/profile";
import Notifications from "@pages/dao/[id]/notifications";
import Dao from "@pages/dao/[id]";
import Creation from "@pages/creation";
import Wallet from "@pages/dao/[id]/wallet";
import Activity from "@pages/dao/[id]/activity";
import Members from "@pages/dao/[id]/members";
import Staking from "@pages/dao/[id]/staking";
import ManageStake from "@pages/dao/[id]/staking/manage";
import Distributions from "@pages/dao/[id]/distributions";
import CreateDistribution from "@pages/dao/[id]/distributions/create";
import Distribution from "@pages/dao/[id]/distribution/[distribution_id]";
import RedeemDistribution from "@pages/dao/[id]/distribution/redeem/[distribution_id]";
import Token from "@pages/dao/[id]/financials/token";
import Tokenomics from "@pages/dao/[id]/financials/tokenomics";
import Recurring from "@pages/dao/[id]/financials/recurring";
import Treasury from "@pages/dao/[id]/financials/treasury";
import Send from "@pages/dao/[id]/financials/treasury/send";
import Burn from "@pages/dao/[id]/financials/token/burn";
import DaoConfig from "@pages/dao/[id]/dao-config";
import ProposalAddendum from "@pages/dao/proposal/[proposal_id]/addendum/[addendum_id]";

export const isDao = (Component: any) => {
  return (
    Component === Creation ||
    Component === Dao ||
    Component === Notifications ||
    // Component === Profile ||
    Component === Dashboard ||
    Component === Edit ||
    Component === All ||
    Component === Following ||
    Component === Mine ||
    Component === EditNotifications ||
    Component === Proposal ||
    Component === Discussion ||
    Component === Create ||
    Component === Vote ||
    Component === CastVote ||
    // Component === Member ||
    Component === CreateProposal ||
    Component === CreateDiscussion ||
    Component === Past ||
    Component === Wallet ||
    Component === Activity ||
    Component === Members ||
    Component === Staking ||
    Component === ManageStake ||
    Component === Distributions ||
    Component === CreateDistribution ||
    Component === Distribution ||
    Component === RedeemDistribution ||
    Component === Token ||
    Component === Tokenomics ||
    Component === Recurring ||
    Component === Treasury ||
    Component === Send ||
    Component === Burn ||
    Component === DaoConfig ||
    Component === ProposalAddendum
  );
};
