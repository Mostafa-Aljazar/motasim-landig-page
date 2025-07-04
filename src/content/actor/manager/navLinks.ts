import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { Newspaper, User } from 'lucide-react';



//what appear to manager 
export const managerNavLinks = (manager_Id: number) => {

    const managerRoutes = MANAGER_ROUTES_fUNC(manager_Id);

    return [
        { label: 'الملف الشخصي', href: managerRoutes.PROFILE, icon: User },
        { label: 'الإعلانات و المدونات', href: managerRoutes.ADS_BLOGS, icon: Newspaper },
    ] as const;
};

