const assignUser = (user, values, userid) => {
  const temp = [...values.ticketActivity];
  temp.push({
    '@type': user,
    action: 'logTask',
    author: userid,
    date: new Date(),
    text: 'has changed the assignee to'
  });
  return {
    status: values.status === 'Open' ? 'InProgress' : values.status,
    assignee: { id: user, isAssigned: true },
    assignees: [{ id: user }],

    ticketActivity: temp
  };
};
export default { assignUser };
