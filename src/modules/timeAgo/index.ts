import TimeAgo from "./timeAgo";

export default (datetime: string): string => {
	const timeago = new TimeAgo(datetime);
	return timeago.getTimeAgo();
};
