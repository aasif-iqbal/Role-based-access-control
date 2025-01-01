import { Router } from 'express';
import user from './user';
import role from './role';
import permission from './permission';
import routePermission from './routePermissions';

const router = Router();

router.use('/user', user);
router.use('/role', role);
router.use('/permission', permission);
router.use('/route-permissions', routePermission);

export default router;
