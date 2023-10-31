import { Routes, Route } from "react-router-dom";
import { Timeline } from "./pages/Timeline";
import { Status } from "./pages/Status";
import { Default } from "./layouts/Default";
import BookMarks from "./pages/BookMarks";
import Explorer from "./pages/Explorer";
import Lists from "./pages/Lists";
import Messages from "./pages/Messages";
import More from "./pages/More";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import InitalLogin from "./pages/InitialLogin";

import Verified from "./pages/subpages/Verified";

import ProfileReplies from "./pages/subpages/ProfileReplies";
import ProfileHighlights from "./pages/subpages/ProfileHighlights";
import ProfileMedia from "./pages/subpages/ProfileMedia";
import ProfileLikes from "./pages/subpages/ProfileLikes";
import Mentions from "./pages/subpages/Mentions";
import AllNotifications from "./pages/AllNotifications";
import { ProfilePosts } from "./pages/subpages/ProfilePosts";
import CreatePassword from "./pages/CreatePassword";

export function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Timeline />} />
        <Route path="bookmarks" element={<BookMarks />} />
        <Route path="explorer" element={<Explorer />} />
        <Route path="lists" element={<Lists />} />
        <Route path="more" element={<More />} />
        <Route path="status/:id" element={<Status />} />
        <Route path="notifications" element={<Notifications />}>
          <Route index />
          <Route path="verified" element={<Verified />} />
          <Route path="all" element={<AllNotifications />} />
          <Route path="mentions" element={<Mentions />} />
        </Route>
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<ProfilePosts />} />
          <Route path="with_replies" element={<ProfileReplies />} />
          <Route path="highlights" element={<ProfileHighlights />} />
          <Route path="media" element={<ProfileMedia />} />
          <Route path="likes" element={<ProfileLikes />} />
        </Route>
      </Route>
      <Route path="login" element={<InitalLogin />}/>
      <Route path="createpassword" element={<CreatePassword/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
