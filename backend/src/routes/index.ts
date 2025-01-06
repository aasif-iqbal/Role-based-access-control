import { Router } from 'express';
import user from './user';
import role from './role';
import permission from './permission';
import post from './post';
import category from './category';
import comment from './comment';
import like from './like';
import routePermission from './routePermissions';
import userPermission from './userPermissions';

const router = Router();

router.use('/users', user);
router.use('/roles', role);
router.use('/permissions', permission);
router.use('/posts', post);
router.use('/categories', category);
router.use('/comments', comment);
router.use('/likes', like);
router.use('/route-permissions', routePermission);
router.use('/user-permissions', userPermission);

export default router;
