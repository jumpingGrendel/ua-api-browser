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
      "subset": null
    },
    "api_device_pins": {
      "uri": "/api/device_pins/",
      "subset": {
        "device_pins_pin": {
          "uri": "{8}",
          "subset": null
        }        
      }
    },
    "api_tags": {
      "uri": "/api/tags/",
      "subset": {
        "device_token_tags_tag": {
          "uri": "{tag}",
          "actions": {
            "PUT": {
              "tag": "New Tag",
            }
          },
          "subset": null
        },
        "tags_batch": {
          "uri": "batch/",
          "subset": null
        },
        "tags_tag": {
          "uri": "(.*)",
          "subset": null
        }        
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
        "user_tags": {
          "uri": "tags/",
          "subset": null
        },
        "user_messages": {
          "uri": "{user_id}/messages/",
          "actions": {
            "GET": {
              "user_id": "some user id",
              "full_list": true,
              "since": "some_message_id",
            }
          },
          "subset": {
            "user_message_body": {
              "uri": "message/(.*)/body/",
              "subset": null
            },
            "user_message": {
              "uri": "message/([^/]*)/",
              "subset": null
            },
            "user_message_read": {
              "uri": "message/(.*)/read/",
              "subset": null
            }            
          }
        },
        "user_messages_delete": {
          "uri": "messages/delete/",
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
        "user_alias": {
          "uri": "alias/",
          "subset": null
        },
        "user_messages_unread": {
          "uri": "messages/unread/",
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
        "user_recover_key": {
          "uri": "recover/(.*)/",
          "subset": null
        },
        "user_recover": {
          "uri": "recover/",
          "subset": null
        }        
      }
    },
    "api_users": {
      "uri": "/api/users/",
      "subset": null
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
      "subset": {
        "app_stats_iap": {
          "uri": "stats/iap/",
          "subset": null
        }        
      }
    },
    "api_feeds": {
      "uri": "/api/feeds/",
      "subset": null
    },
}
