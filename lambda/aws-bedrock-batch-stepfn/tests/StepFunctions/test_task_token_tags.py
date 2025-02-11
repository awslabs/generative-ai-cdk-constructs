#  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
#  with the License. A copy of the License is located at
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
#  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
#  and limitations under the License.
#
#
#  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
#  with the License. A copy of the License is located at
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
#  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
#  and limitations under the License.
#

import pytest

from aws_bedrock_batch_sfn.StepFunctions.task_token_tags import get_task_token_from_tags, build_task_token_tags


def test_build_task_token_tags():
    token = "test-token"
    tags = build_task_token_tags(token)

    assert tags == [{"key": "TaskToken:0", "value": "test-token"}]


def test_build_task_token_tags_4parts():
    # each part is 256 characters
    part_1 = "test-token-oneaa" * 16
    part_2 = "test-token-twoaa" * 16
    part_3 = "test-token-three" * 16
    part_4 = "test-token-four"
    token = part_1 + part_2 + part_3 + part_4
    tags = build_task_token_tags(token)

    assert tags == [
        {"key": "TaskToken:0", "value": part_1},
        {"key": "TaskToken:1", "value": part_2},
        {"key": "TaskToken:2", "value": part_3},
        {"key": "TaskToken:3", "value": part_4},
    ]


def test_build_task_token_tags_2parts():
    part_1 = "test-token-oneaa" * 16
    part_2 = "test-token-twoaa"
    token = part_1 + part_2
    tags = build_task_token_tags(token)

    assert tags == [
        {"key": "TaskToken:0", "value": part_1},
        {"key": "TaskToken:1", "value": part_2},
    ]


def test_build_task_token_tags_too_long():
    token = "test-token" * 103
    with pytest.raises(ValueError):
        build_task_token_tags(token)


def test_get_task_token():
    tags = [
        {"key": "TestTag", "value": "test-value"},
        {"key": "TaskToken:0", "value": "test-token"},
    ]

    token = get_task_token_from_tags(tags)

    assert token == "test-token"


def test_get_task_token_4parts():
    tags = [
        {"key": "TaskToken:0", "value": "test-token-part-1"},
        {"key": "TaskToken:1", "value": "test-token-part-2"},
        {"key": "TaskToken:2", "value": "test-token-part-3"},
        {"key": "TaskToken:3", "value": "test-token-part-4"},
    ]

    token = get_task_token_from_tags(tags)

    assert token == "test-token-part-1test-token-part-2test-token-part-3test-token-part-4"


def test_get_task_token_2parts():
    tags = [
        {"key": "TaskToken:0", "value": "test-token-part-1"},
        {"key": "TaskToken:1", "value": "test-token-part-2"},
    ]

    token = get_task_token_from_tags(tags)

    assert token == "test-token-part-1test-token-part-2"


def test_get_task_token_empty_part():
    tags = [
        {"key": "TaskToken:0", "value": "test-token-part-1"},
        {"key": "TaskToken:1", "value": "test-token-part-2"},
        {"key": "TaskToken:2", "value": "test-token-part-3"},
        {"key": "TaskToken:3", "value": ""},
    ]

    token = get_task_token_from_tags(tags)

    assert token == "test-token-part-1test-token-part-2test-token-part-3"


def test_get_task_token_no_tags():
    tags = []

    with pytest.raises(KeyError):
        get_task_token_from_tags(tags)


def test_get_task_token_no_task_token_tags():
    tags = [
        {"key": "TestTag", "value": "test-value"},
    ]

    with pytest.raises(KeyError):
        get_task_token_from_tags(tags)
