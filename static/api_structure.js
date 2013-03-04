var api_structure = {
    "api_device_tokens": {
      "uri": "/api/device_tokens/",
      "actions": {
        "GET": {
          "limit": 10,
        }
      },
      "subset": {
        "api_device_tokens_register": {
          "uri": "{device_token}",
          "actions": {
            "PUT": {
              "device_token": "FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660",
              "alias": "your_user_id",
              "tags": [
                "tag1",
                "tag2"
              ],
              "badge": 2,
              "quiettime": {
                "start": "22:00",
                "end": "8:00"
              },
              "tz": "America/Los_Angeles"
            },
            "DELETE": {
              "device_token": "FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660",
            },
            "GET": {
              "device_token": "FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660",              
            }
          },
        },
        "device_token_token": {
          "uri": "{device_token}/tags/{tag}",
          "actions": {
            "PUT": {
              "device_token": "FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660",
              "tag": "New Tag"
            }
          },
          "subset": null
        },
        "device_token_count": {
          "uri": "count/",
          "actions": {
            "GET": {
              
            }
          },
          "subset": null
        },
        "device_token_feedback": {
          "uri": "feedback/",
          "actions": {
            "GET": {
              "since": "2013-03-01"
            }
          },
          "subset": null
        }
      }
    },
    "api_apids": {
      "uri": "/api/apids/",
      "actions": {
        "GET": {
          "limit": 10,
        }
      },
      "subset": null
    },
    "api_device_pins": {
      "uri": "/api/device_pins/",
      "actions": {
        "GET": {
          "limit": 10,
        }
      },
      "subset": {
        "device_pins_pin": {
          "uri": "{device_pin}",
          "actions": {
            "PUT": {
              "device_pin": "some device pin",
              "alias": "your_user_id",
              "last_registration": "2009-11-06 20:41:06",
              "created": "2009-11-06 20:41:06",
              "active": true,
              "tags": [
                  "tag1",
                  "tag2"
              ]
            },
            "GET": {
              "device_pin": "some device pin",
            },
            "DELETE": {
              "device_pin": "some device pin",
            }
          },
          "subset": null
        }        
      }
    },
    "api_tags": {
      "uri": "/api/tags/",
      "actions": {
        "GET": {
        }
      },
      "subset": {
        "device_token_tags_tag": {
          "uri": "{tag}",
          "actions": {
            "PUT": {
              "tag": "some_tag",
            },
            "POST": {
              "tag": "some_tag",
              "device_tokens": {
                  "add": [
                      "device_token_1_to_add",
                      "device_token_2_to_add"
                  ],
                  "remove": [
                      "device_token_to_remove"
                  ]
              },
              "device_pins": {
                  "add": [
                      "device_pin_1_to_add",
                      "device_pin_2_to_add"
                  ],
                  "remove": [
                      "device_pin_to_remove"
                  ]
              },
              "apids": {
                  "add": [
                      "apid_1_to_add",
                      "apid_2_to_add"
                  ],
                  "remove": [
                      "apid_to_remove"
                  ]
              }
            },
            "DELETE": {
              "tag": "some_tag"
            }
          },
          "subset": null
        },
      }
    },
    "api_push": {
      "uri": "/api/push/",
      "actions": {
        "POST": {
          "device_tokens": [
              "FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660",
          ],
          "aliases": [
              "user1",
              "user2"
          ],
          "tags": [
              "tag1",
              "tag2"
          ],
          "schedule_for": [
              "2010-07-27 22:48:00",
          ],
          "exclude_tokens": [
              "device token you want to skip",
              "another device token you want to skip"
          ],
          "aps": {
               "badge": 10,
               "alert": "Hello from Urban Airship!",
               "sound": "default"
          },
          "android": {
              "alert": "hi android",
          },
          "blackberry": {
               "content-type": "text/plain",
               "body": "Hello from Urban Airship!"
          }
        }
      },
      "subset": {
        "push_stats": {
          "uri": "stats/",
          "actions": {
            "GET": {
              "start": "2013-02-01",
              "end": "2013-03-01",
            }
          },
          "subset": null
        },
        "push_scheduled": {
          "uri": "scheduled/",
          "actions": {
            "DELETE": {
              "alias": "my alias"
            },
            "POST":{
              "cancel": [
                  "https://go.urbanairship.com/api/push/scheduled/XX",
                  "https://go.urbanairship.com/api/push/scheduled/XY"
              ],
              "cancel_aliases": [
                  "some_alias",
                  "another_alias"
              ],
              "cancel_device_tokens": [
                  "example_device_token",
                  "other_example_device_token"
              ]
            },
            "PUT":{
              "cancel": [
                  "https://go.urbanairship.com/api/push/scheduled/XX",
                  "https://go.urbanairship.com/api/push/scheduled/XY"
              ],
              "cancel_aliases": [
                  "some_alias",
                  "another_alias"
              ],
              "cancel_device_tokens": [
                  "example_device_token",
                  "other_example_device_token"
              ]
            },
          },
          "subset": {
            "push_scheduled_alias": {
              "uri": "{alias}",
              "subset": null
            },
            "push_scheduled_id": {
              "uri": "[\\d]+",
              "subset": null
            }            
          }
        },
        "push_broadcast": {
          "uri": "broadcast/",
          "actions": {
            "POST": {
              "aps": {
                   "badge": "+1",
                   "alert": "Hello!",
                   "sound": "default"
              },
              "android": {
                  "alert": "hi android",
              },
              "exclude_tokens": [
                  "device token you want to skip",
                  "another device token you want to skip"
              ]
            },
          },
          "subset": null
        },
        "push_batch": {
          "uri": "batch/",
          "actions": {
            "POST": {
              "device_tokens": [
                  "FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660",
              ],
              "aliases": [
                  "user1",
                  "user2"
              ],
              "tags": [
                  "tag1",
                  "tag2"
              ],
              "schedule_for": [
                  "2010-07-27 22:48:00",
              ],
              "exclude_tokens": [
                  "device token you want to skip",
                  "another device token you want to skip"
              ],
              "aps": {
                   "badge": 10,
                   "alert": "Hello from Urban Airship!",
                   "sound": "default"
              },
              "android": {
                  "alert": "hi android",
              },
            }
          },
          "subset": null
        }        
      }
    },
    "api_user": {
      "uri": "/api/user/",
      "actions": {
        "POST": {
          "alias": "an_alias",
          "tags": ["a", "list", "of", "tags"],
          "device_tokens": ["FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660"],
          "udid": "<device identifier>"
        },
      },
      "subset": {
        "user_messages": {
          "uri": "{user_id}/messages/",
          "actions": {
            "GET": {
              "user_id": "some user id",
              "full_list": true,
              "since": "some_message_id",
            }
          },
          "user_message_body": {
            "uri": "message/(.*)/body/",
            "subset": null
          },
          "user_message": {
            "uri": "{user_id}/message/{message_body}/",
            "subset": null
          },
          "user_message_read": {
            "uri": "{user_id}/message/{message}/read/",
            "subset": null
          }            
        },
        "user_messages_delete": {
          "uri": "{user_id}/messages/delete/",
          "actions": {
            "POST": {
              "user_id": "some_user_id",
            }
          },
          "subset": null
        },
        "user_creds_reset": {
          "uri": "{user_id}/creds/reset/",
          "actions": {
            "POST": {
              "user_url": "https://go.urbanairship.com/api/user/example_user_id/",
              "user_id": "example_user_id",
              "password": "new_example_password"              
            }
          },
          "subset": null
        },
        "user_messages_unread": {
          "uri": "{user_id}/messages/unread/",
          "actions": {
            "GET": {
              "user_id": "some_user_id",
            }
          },
          "subset": null
        },
        "user_with_id": {
          "uri": "{user_id}",
          "actions": {
            "DELETE": {
              "user_id": "example_user_id",
            },
            "PUT": {
              "user_id": "example_user_id",
              "tags": ["a", "list", "of", "tags", "plus"],
              "device_tokens": ["FE66489F304DC75B8D6E8200DFF8A456E8DAEACEC428B427E9518741C92C6660"],
              "alias": "an_alias"              
            },
          },
          "subset": null
        },
      }
    },
    "api_airmail_send": {
      "uri": "/api/airmail/send/",
      "actions": {
        "POST": {
          "push": {
              "aps": {
                  "alert": "New message!"
              }
          },
          "tags": ["tags", "to", "send", "to"],
          "users": ["user", "ids", "to", "send", "to"],
          "aliases": ["aliases", "to", "send", "to"],
          "title": "Message title",
          "message": "Your full message here.",
          "content-type": "text/html",
          "extra": {
              "some_key": "some_value"
          }
        }
      },
      "subset": {
        "airmail_send_batch": {
          "uri": "batch/",
          "actions": {
            "POST": {
              "push": {
                  "aps": {
                      "alert": "New message!"
                  }
              },
              "title": "Message title",
              "message": "Your full message here.",
              "content-type": "text/html",
              "extra": {
                  "some_key": "some_value"
              }
            },
          },
          "subset": null
        },
        "airmail_send_broadcast": {
          "uri": "broadcast/",
          "actions": {
            "POST": {
              "push": {
                  "aps": {
                      "alert": "New message!"
                  }
              },
              "title": "Message title",
              "message": "Your full message here.",
              "content-type": "text/html",
              "extra": {
                  "some_key": "some_value"
              }
            },
          },
          "subset": null
        }        
      }
    },
    "api_app": {
      "uri": "/api/app/",
      "actions": {
        "GET": {
          "limit": 100,
        }
      },
      "subset": {
        "app_stats_iap": {
          "uri": "stats/iap/",
          "actions": {
            "GET": {
              "start": "2013-02-01",
              "end": "2013-03-01"
            }
          },
          "subset": null
        }        
      }
    },
    "api_feeds": {
      "uri": "/api/feeds/",
      "actions": {
        "POST": {
          "feed_url": "http://example.com/atom.xml",
          "template": {
              "aps": {
                  "badge": 1,
                  "sound": "cat.caf",
                  "alert": "New item from some place! {{ title }}"
              }
          },
          "broadcast": true,      
        },
        "GET": {
          
        },
      },
      "subset": {
        "feed_feed_id": {
          "uri": "{feed_id}",
          "actions": {
            "GET": {
              "feed_id": "some_feed_id"
            },
            "DELETE": {
              "feed_id": "some_feed_id"              
            }
          },
          "subset": null
        }
      }
    },
}
