export const mediaConvertJobTemplate = {
  "Name": "TimelinerPoCTemplate",
  "Description": "MediaConvert job template for Timeliner PoC - Converts videos to HLS format",
  "Settings": {
    "OutputGroups": [
      {
        "Name": "Apple HLS",
        "OutputGroupSettings": {
          "Type": "HLS_GROUP_SETTINGS",
          "HlsGroupSettings": {
            "ManifestDurationFormat": "INTEGER",
            "SegmentLength": 10,
            "SegmentControl": "SEGMENTED_FILES",
            "DirectoryStructure": "SINGLE_DIRECTORY",
            "ManifestCompression": "NONE",
            "StreamInfResolution": "INCLUDE",
            "ClientCache": "ENABLED",
            "AudioOnlyHeader": "INCLUDE",
            "CodecSpecification": "RFC_4281",
            "OutputSelection": "MANIFESTS_AND_SEGMENTS",
            "ProgramDateTime": "EXCLUDE",
            "ProgramDateTimePeriod": 600,
            "TimestampDeltaMilliseconds": 0,
            "SegmentLengthControl": "EXACT",
            "CaptionLanguageSetting": "OMIT",
            "CaptionSegmentLengthControl": "LARGE_SEGMENTS"
          }
        },
        "Outputs": [
          {
            "VideoDescription": {
              "Width": 1920,
              "Height": 1080,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "QVBR",
                  "QvbrSettings": {
                    "QvbrQualityLevel": 8
                  },
                  "CodecProfile": "HIGH",
                  "CodecLevel": "AUTO",
                  "FieldEncoding": "PAFF",
                  "SceneChangeDetect": "ENABLED",
                  "QualityTuningLevel": "SINGLE_PASS",
                  "FramerateConversionAlgorithm": "DUPLICATE_DROP",
                  "UnregisteredSeiTimecode": "DISABLED",
                  "GopSizeUnits": "FRAMES",
                  "ParControl": "SPECIFIED",
                  "NumberBFramesBetweenReferenceFrames": 2,
                  "RepeatPps": "DISABLED",
                  "DynamicSubGop": "STATIC",
                  "GopSize": 90,
                  "GopBReference": "DISABLED",
                  "SlowPal": "DISABLED",
                  "EntropyEncoding": "CABAC",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "FlickerAdaptiveQuantization": "DISABLED",
                  "SpatialAdaptiveQuantization": "ENABLED",
                  "TemporalAdaptiveQuantization": "ENABLED",
                  "ParNumerator": 1,
                  "ParDenominator": 1
                }
              },
              "TimecodeInsertion": "DISABLED",
              "AntiAlias": "ENABLED",
              "RespondToAfd": "NONE",
              "Sharpness": 50,
              "ColorMetadata": "INSERT"
            },
            "AudioDescriptions": [
              {
                "AudioTypeControl": "FOLLOW_INPUT",
                "AudioSourceName": "Audio Selector 1",
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "AudioDescriptionBroadcasterMix": "NORMAL",
                    "Bitrate": 128000,
                    "RateControlMode": "CBR",
                    "CodecProfile": "LC",
                    "CodingMode": "CODING_MODE_2_0",
                    "RawFormat": "NONE",
                    "SampleRate": 48000,
                    "Specification": "MPEG4"
                  }
                },
                "LanguageCodeControl": "FOLLOW_INPUT"
              }
            ],
            "OutputSettings": {
              "HlsSettings": {
                "AudioGroupId": "audio",
                "AudioOnlyContainer": "AUTOMATIC",
                "IFrameOnlyManifest": "EXCLUDE",
                "AudioTrackType": "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
              }
            },
            "ContainerSettings": {
              "Container": "M3U8",
              "M3u8Settings": {
                "AudioFramesPerPes": 4,
                "PcrControl": "PCR_EVERY_PES_PACKET",
                "PmtPid": 480,
                "PrivateMetadataPid": 503,
                "ProgramNumber": 1,
                "PatInterval": 0,
                "PmtInterval": 0,
                "VideoPid": 481,
                "AudioPids": [
                  482,
                  483,
                  484,
                  485,
                  486,
                  487,
                  488,
                  489,
                  490,
                  491,
                  492,
                  493,
                  494,
                  495,
                  496,
                  497,
                  498
                ],
                "NielsenId3Behavior": "NO_PASSTHROUGH",
                "AudioDuration": "DEFAULT_CODEC_DURATION"
              }
            },
            "NameModifier": "-1080p"
          },
          {
            "VideoDescription": {
              "Width": 1280,
              "Height": 720,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "QVBR",
                  "QvbrSettings": {
                    "QvbrQualityLevel": 7
                  },
                  "CodecProfile": "MAIN",
                  "CodecLevel": "AUTO",
                  "FieldEncoding": "PAFF",
                  "SceneChangeDetect": "ENABLED",
                  "QualityTuningLevel": "SINGLE_PASS",
                  "FramerateConversionAlgorithm": "DUPLICATE_DROP",
                  "UnregisteredSeiTimecode": "DISABLED",
                  "GopSizeUnits": "FRAMES",
                  "ParControl": "SPECIFIED",
                  "NumberBFramesBetweenReferenceFrames": 2,
                  "RepeatPps": "DISABLED",
                  "DynamicSubGop": "STATIC",
                  "GopSize": 90,
                  "GopBReference": "DISABLED",
                  "SlowPal": "DISABLED",
                  "EntropyEncoding": "CABAC",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "FlickerAdaptiveQuantization": "DISABLED",
                  "SpatialAdaptiveQuantization": "ENABLED",
                  "TemporalAdaptiveQuantization": "ENABLED",
                  "ParNumerator": 1,
                  "ParDenominator": 1
                }
              },
              "TimecodeInsertion": "DISABLED",
              "AntiAlias": "ENABLED",
              "RespondToAfd": "NONE",
              "Sharpness": 50,
              "ColorMetadata": "INSERT"
            },
            "AudioDescriptions": [
              {
                "AudioTypeControl": "FOLLOW_INPUT",
                "AudioSourceName": "Audio Selector 1",
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "AudioDescriptionBroadcasterMix": "NORMAL",
                    "Bitrate": 96000,
                    "RateControlMode": "CBR",
                    "CodecProfile": "LC",
                    "CodingMode": "CODING_MODE_2_0",
                    "RawFormat": "NONE",
                    "SampleRate": 48000,
                    "Specification": "MPEG4"
                  }
                },
                "LanguageCodeControl": "FOLLOW_INPUT"
              }
            ],
            "OutputSettings": {
              "HlsSettings": {
                "AudioGroupId": "audio",
                "AudioOnlyContainer": "AUTOMATIC",
                "IFrameOnlyManifest": "EXCLUDE",
                "AudioTrackType": "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
              }
            },
            "ContainerSettings": {
              "Container": "M3U8",
              "M3u8Settings": {
                "AudioFramesPerPes": 4,
                "PcrControl": "PCR_EVERY_PES_PACKET",
                "PmtPid": 480,
                "PrivateMetadataPid": 503,
                "ProgramNumber": 1,
                "PatInterval": 0,
                "PmtInterval": 0,
                "VideoPid": 481,
                "AudioPids": [
                  482,
                  483,
                  484,
                  485,
                  486,
                  487,
                  488,
                  489,
                  490,
                  491,
                  492,
                  493,
                  494,
                  495,
                  496,
                  497,
                  498
                ],
                "NielsenId3Behavior": "NO_PASSTHROUGH",
                "AudioDuration": "DEFAULT_CODEC_DURATION"
              }
            },
            "NameModifier": "-720p"
          },
          {
            "VideoDescription": {
              "Width": 640,
              "Height": 480,
              "CodecSettings": {
                "Codec": "H_264",
                "H264Settings": {
                  "RateControlMode": "QVBR",
                  "QvbrSettings": {
                    "QvbrQualityLevel": 6
                  },
                  "CodecProfile": "MAIN",
                  "CodecLevel": "AUTO",
                  "FieldEncoding": "PAFF",
                  "SceneChangeDetect": "ENABLED",
                  "QualityTuningLevel": "SINGLE_PASS",
                  "FramerateConversionAlgorithm": "DUPLICATE_DROP",
                  "UnregisteredSeiTimecode": "DISABLED",
                  "GopSizeUnits": "FRAMES",
                  "ParControl": "SPECIFIED",
                  "NumberBFramesBetweenReferenceFrames": 2,
                  "RepeatPps": "DISABLED",
                  "DynamicSubGop": "STATIC",
                  "GopSize": 90,
                  "GopBReference": "DISABLED",
                  "SlowPal": "DISABLED",
                  "EntropyEncoding": "CABAC",
                  "FramerateControl": "INITIALIZE_FROM_SOURCE",
                  "FlickerAdaptiveQuantization": "DISABLED",
                  "SpatialAdaptiveQuantization": "ENABLED",
                  "TemporalAdaptiveQuantization": "ENABLED",
                  "ParNumerator": 1,
                  "ParDenominator": 1
                }
              },
              "TimecodeInsertion": "DISABLED",
              "AntiAlias": "ENABLED",
              "RespondToAfd": "NONE",
              "Sharpness": 50,
              "ColorMetadata": "INSERT"
            },
            "AudioDescriptions": [
              {
                "AudioTypeControl": "FOLLOW_INPUT",
                "AudioSourceName": "Audio Selector 1",
                "CodecSettings": {
                  "Codec": "AAC",
                  "AacSettings": {
                    "AudioDescriptionBroadcasterMix": "NORMAL",
                    "Bitrate": 64000,
                    "RateControlMode": "CBR",
                    "CodecProfile": "LC",
                    "CodingMode": "CODING_MODE_2_0",
                    "RawFormat": "NONE",
                    "SampleRate": 48000,
                    "Specification": "MPEG4"
                  }
                },
                "LanguageCodeControl": "FOLLOW_INPUT"
              }
            ],
            "OutputSettings": {
              "HlsSettings": {
                "AudioGroupId": "audio",
                "AudioOnlyContainer": "AUTOMATIC",
                "IFrameOnlyManifest": "EXCLUDE",
                "AudioTrackType": "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
              }
            },
            "ContainerSettings": {
              "Container": "M3U8",
              "M3u8Settings": {
                "AudioFramesPerPes": 4,
                "PcrControl": "PCR_EVERY_PES_PACKET",
                "PmtPid": 480,
                "PrivateMetadataPid": 503,
                "ProgramNumber": 1,
                "PatInterval": 0,
                "PmtInterval": 0,
                "VideoPid": 481,
                "AudioPids": [
                  482,
                  483,
                  484,
                  485,
                  486,
                  487,
                  488,
                  489,
                  490,
                  491,
                  492,
                  493,
                  494,
                  495,
                  496,
                  497,
                  498
                ],
                "NielsenId3Behavior": "NO_PASSTHROUGH",
                "AudioDuration": "DEFAULT_CODEC_DURATION"
              }
            },
            "NameModifier": "-480p"
          }
        ],
        "AutomatedEncodingSettings": {
          "AbrSettings": {
            "AutoAbrSettings": {
              "High": 0,
              "Low": 0,
              "Max": 8000000,
              "Min": 400000
            }
          }
        }
      }
    ],
    "AdAvailOffset": 0,
    "Inputs": [
      {
        "AudioSelectors": {
          "Audio Selector 1": {
            "Offset": 0,
            "DefaultSelection": "DEFAULT",
            "ProgramSelection": 1
          }
        },
        "VideoSelector": {
          "ColorSpace": "FOLLOW"
        },
        "FilterEnable": "AUTO",
        "PsiControl": "USE_PSI",
        "FilterStrength": 0,
        "DeblockFilter": "DISABLED",
        "DenoiseFilter": "DISABLED",
        "TimecodeSource": "EMBEDDED",
        "FileInput": "INPUT_PLACEHOLDER"
      }
    ]
  },
  "Type": "CUSTOM",
  "StatusUpdateInterval": "SECONDS_60",
  "Priority": 0,
  "HopDestinations": []
};