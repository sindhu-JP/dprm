import moment from 'moment';
import _orderBy from 'lodash/orderBy';
import _groupBy from 'lodash/groupBy';
import { isArray } from 'util';

export const getDateTime = (timeStamp, format) =>
  moment(timeStamp).format(format);

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical':
      return 'criticalPriority';
    case 'High':
      return 'highPriority';
    case 'Medium':
      return 'mediumPriority';
    case 'Low':
      return 'lowPriority';
    default:
      return '';
      break;
  }
};

export const getSortedGroupData = (notes, maxData) => {
  if (!isArray(notes)) {
    return {};
  }
  const clonedNotesData = [...notes];
  // sort the data and will take top 4 data only
  const sortedData = _orderBy(
    clonedNotesData,
    ['createdDate'],
    ['desc']
  ).splice(0, maxData ? maxData - 1 : 0);

  // return the group data based on date time
  return _groupBy(sortedData, (item1) => {
    return getDateTime(item1.createdDate, 'DD MMM YYYY');
  });
};
