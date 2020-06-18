/**
 */

import Interface from './Interface';
import TaskLogic from './TaskLogic';

const userInterface = new Interface();
userInterface.init();

const taskLogic = new TaskLogic(userInterface);
taskLogic.init();
