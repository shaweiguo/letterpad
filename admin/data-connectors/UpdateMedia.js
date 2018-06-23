import { graphql } from "react-apollo";
import { UPDATE_MEDIA } from "../../shared/queries/Mutations";

export default graphql(UPDATE_MEDIA, {
    props: ({ mutate }) => ({
        updateMedia: data =>
            mutate({
                variables: data,
                updateQueries: {
                    getMedia: (previousResult, { mutationResult }) => {
                        return {
                            media: {
                                count: previousResult.media.count,
                                rows: previousResult.media.rows.map(item => {
                                    if (data.id == item.id) {
                                        item = { ...item, ...data };
                                    }
                                    return item;
                                }),
                                __typename: previousResult.media.__typename
                            }
                        };
                    }
                }
            })
    })
});
