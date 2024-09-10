

import { ageRangeStats } from '@delightree/main/ageRangeStats';
import express from 'express'

export const router = express.Router();


router.route( '/age-range/stats').get( ageRangeStats );
