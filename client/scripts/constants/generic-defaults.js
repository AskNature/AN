'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'AskNature',
        description: 'Nature is Coming',
        keywords: ['biomimicry','design']
    },

    relationshipList: {
        results: [],
        boxvalue: ''
    },

    entity: {

        addedby_id: '',
        addedby_first: '',
        addedby_last: '',
        description: '',
        featured_count: '',
        groupid: '',
        groupname: '',
        headline: '',
        masterid: '',
        name: '',
        short_name: '',
        special_text: '',
        timestamp: '0000-00-00 00:00:00',
        type: '',

        width: 200,
        height: 100,

        roles: ',',
        activities: ',',
        keywords: ',',

        flag_text: 0,
        flag_tags: 0,
        flag_media: 0,
        is_deleted: 0,

        addedby: [],

        collectors: [],
        collected: [],

        conditions: [],

        created_by: [],

        children: [],
        parent: [],

        designedsystems: [],
        dsystems: [],

        experts: [],
        experts_institution: [],

        featured_in: [],

        flagged: [],
        friends: [],

        functions: [],

        has_function: [],
        has_living_system: [],
        has_media: [],

        inspiredby: [],
        inspiredby_id: [],

        living_systems: [],
        living_system: [],
        living_system_taxon: [],
        living_system_id: [],

        mechanism: [],
        mechanisms: [],
        mechanisms_id: [],

        media: [],
        media_name: [],
        media_entity: [],
        media_id: [],
        added_media: [],

        outcome: [],
        outcomes: [],
        outcomes_id: [],

        out_HasLicense: [],
        in_AddedMedia: [],

        products: [],
        product_masterid: [],

        sources: [],
        sources_authors: [],
        sources_year: [],
        sources_id: [],

        strategies: [],

        status: {value: '', options:[{value: '', label: ''}]},

        studies: []

    }
};

module.exports = Defaults;
