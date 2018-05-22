import ITSAPIResponse from "../../api/ITSAPIResponse";

const tsResponseMock: ITSAPIResponse = {
    "data": [
        [
            "2017-10-01",
            128.1
        ],
        [
            "2017-11-01",
            125.9
        ]
    ],
    "meta": [
        {
            "dataset": []
        },
        {
            "dataset": [
                {
                    "distribution": [
                        {
                            "field": [
                                {
                                    "description": "example field description",
                                    "id": "example field id",
                                    "title": "example field title",
                                }
                            ],
                        }
                    ],
                    "publisher": {
                        "mbox": "example@dataset.com",
                        "name": "example dataset publisher name"
                    },
                }
            ],
        },
        {
            "dataset": [
                {
                    "distribution": [
                        {
                            "field": [
                                {
                                    "description": "example field description2",
                                    "id": "example field id2",
                                    "title": "example field title2",
                                }
                            ],
                        }
                    ],
                    "publisher": {
                        "mbox": "example@dataset.com2",
                        "name": "example dataset publisher name2"
                    },
                }
            ],
        }
    ],
    "params": {
        "identifiers": [
            {
                "dataset": "1",
                "distribution": "1.1",
                "id": "example field id"
            }
        ],
        "ids": "example field id",
        "metadata": "full"
    }
};

export default tsResponseMock;