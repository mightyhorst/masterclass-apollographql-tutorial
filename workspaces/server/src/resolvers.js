module.exports = {
    Query: {
        launches: (_, __, { dataSources }) =>
            dataSources.launchAPI.getAllLaunches(),
        launch: (_, { id }, { dataSources }) =>
            dataSources.launchAPI.getLaunchById({ launchId: id }),
        me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            const user = await dataSources.userAPI.findOrCreateUser({ email });
            if (user) {
                user.token = new Buffer(email).toString('base64');
                return user;
            }
        },
        bookTrips: async (_, { launchIds }, { dataSources }) => {
            const results = await dataSources.userAPI.bookTrips({ launchIds });
            const launches = await dataSources.launchAPI.getLaunchesByIds({
                launchIds,
            });

            return {
                success: results && results.length === launchIds.length,
                message:
                    results.length === launchIds.length
                        ? 'trips booked successfully'
                        : `the following launches couldn't be booked: ${launchIds.filter(
                            id => !results.includes(id),
                        )}`,
                launches,
            };
        },
        cancelTrip: async (_, { launchId }, { dataSources }) => {
            const result = await dataSources.userAPI.cancelTrip({ launchId });

            if (!result)
                return {
                    success: false,
                    message: 'failed to cancel trip',
                };

            const launch = await dataSources.launchAPI.getLaunchById({ launchId });
            return {
                success: true,
                message: 'trip cancelled',
                launches: [launch],
            };
        },
    },
    Mission: {
        // The default size is 'LARGE' if not provided
        missionPatch: (mission, { size } = { size: 'LARGE' }) => {
            return size === 'SMALL'
                ? mission.missionPatchSmall
                : mission.missionPatchLarge;
        },
    },
    Launch: {
        isBooked: async (launch, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    },
    User: {
        trips: async (_, __, { dataSources }) => {
            // get ids of launches by user
            const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

            if (!launchIds.length) return [];

            // look up those launches by their ids
            return (
                dataSources.launchAPI.getLaunchesByIds({
                    launchIds,
                }) || []
            );
        },
    },
};
