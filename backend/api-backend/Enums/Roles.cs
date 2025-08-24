using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Plastiki.Enums;

[JsonConverter(typeof(StringEnumConverter))]
public enum Roles
{
    Admin,
    Operator,
    Worker
}