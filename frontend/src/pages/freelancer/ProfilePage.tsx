import Profile from "../../components/common/Profile";
import { useSelector } from "react-redux";

const ProfilePage = () => {

    const { theme } = useSelector((state: RootState) => state.app);


    return (
        <div>
            <Profile />
        </div>
    );
};

export default ProfilePage;
