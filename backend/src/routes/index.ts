import { Router } from 'express';
import user from './user';
import role from './role';
import permission from './permission';
import routePermission from './routePermissions';
import userPermission from './userPermissions';

const router = Router();

router.use('/users', user);
router.use('/roles', role);
router.use('/permissions', permission);
router.use('/route-permissions', routePermission);
router.use('/user-permissions', userPermission);

export default router;
