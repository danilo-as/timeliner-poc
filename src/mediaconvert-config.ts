export const mediaConvertJobTemplate = {
  "Settings": {
    "OutputGroups": [
      {
        "Name": "Apple HLS",
        "OutputGroupSettings": {
          "Type": "HLS_GROUP_SETTINGS",
          "HlsGroupSettings": {
            "ManifestDurationFormat": "INTEGER",
            "SegmentLength": 10,
            "MinSegmentLength": 0,
            "DirectoryStructure": "SINGLE_DIRECTORY",
            "ProgramDateTime": "EXCLUDE",
            "SegmentLengthControl": "EXACT",
            "ManifestCompression": "NONE",
            "ClientCache": "ENABLED",
            "AudioOnlyHeader": "INCLUDE"
          }
        },
        "Outputs": [
          {
            "NameModifier": "_1080p",
            "VideoDescription": {
              "Width": 1920,
              "Height": 1080,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "CBR",
                  "Bitrate": 5000000,
                  "CodecProfile": "HIGH",
                  "CodecLevel": "AUTO",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "GopSize": 90,
                  "EntropyEncoding": "CABAC"
                }
              }
            },
            "AudioDescriptions": [
              {
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "Bitrate": 128000,
                    "CodingMode": "CODING_MODE_2_0",
                    "SampleRate": 48000
                  }
                }
              }
            ],
            "OutputSettings": {
              "HlsSettings": {}
            },
            "ContainerSettings": {
              "Container": "M3U8"
            }
          },
          {
            "NameModifier": "_720p",
            "VideoDescription": {
              "Width": 1280,
              "Height": 720,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "CBR",
                  "Bitrate": 3000000,
                  "CodecProfile": "MAIN",
                  "CodecLevel": "AUTO",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "GopSize": 90,
                  "EntropyEncoding": "CABAC"
                }
              }
            },
            "AudioDescriptions": [
              {
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "Bitrate": 96000,
                    "CodingMode": "CODING_MODE_2_0",
                    "SampleRate": 48000
                  }
                }
              }
            ],
            "OutputSettings": {
              "HlsSettings": {}
            },
            "ContainerSettings": {
              "Container": "M3U8"
            }
          },
          {
            "NameModifier": "_480p",
            "VideoDescription": {
              "Width": 640,
              "Height": 480,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "CBR",
                  "Bitrate": 1500000,
                  "CodecProfile": "MAIN",
                  "CodecLevel": "AUTO",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "GopSize": 90,
                  "EntropyEncoding": "CABAC"
                }
              }
            },
            "AudioDescriptions": [
              {
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "Bitrate": 64000,
                    "CodingMode": "CODING_MODE_2_0",
                    "SampleRate": 48000
                  }
                }
              }
            ],
            "OutputSettings": {
              "HlsSettings": {}
            },
            "ContainerSettings": {
              "Container": "M3U8"
            }
          },
          {
            "NameModifier": "_240p",
            "VideoDescription": {
              "Width": 320,
              "Height": 240,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "CBR",
                  "Bitrate": 800000,
                  "CodecProfile": "MAIN",
                  "CodecLevel": "AUTO",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "GopSize": 90,
                  "EntropyEncoding": "CABAC"
                }
              }
            },
            "AudioDescriptions": [
              {
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "Bitrate": 64000,
                    "CodingMode": "CODING_MODE_2_0",
                    "SampleRate": 48000
                  }
                }
              }
            ],
            "OutputSettings": {
              "HlsSettings": {}
            },
            "ContainerSettings": {
              "Container": "M3U8"
            }
          }
        ]
      }
    ],
    "Inputs": [
      {
        "AudioSelectors": {
          "Audio Selector 1": {
            "DefaultSelection": "DEFAULT"
          }
        },
        "VideoSelector": {},
        "FilterEnable": "AUTO",
        "PsiControl": "USE_PSI",
        "FilterStrength": 0,
        "DeblockFilter": "DISABLED",
        "DenoiseFilter": "DISABLED",
        "TimecodeSource": "EMBEDDED"
      }
    ]
  }
};