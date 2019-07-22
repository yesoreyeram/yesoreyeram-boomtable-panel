jest.mock("app/core/utils/kbn", () => { });
jest.mock("app/core/time_series2", () => { });

import _ from "lodash";
import { normalizeColor, parseMathExpression, getColor, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias } from "./../src/app/boom"
import { doesValueNeedsToHide } from "./../src/app/boom/BoomSeriesUtils";

describe("Normalize Color", () => {
    it("Normalize Named Colors", () => {
        expect(normalizeColor("Green")).toBe("rgba(50, 172, 45, 0.97)");
        expect(normalizeColor("Orange")).toBe("rgba(237, 129, 40, 0.89)");
        expect(normalizeColor("Red")).toBe("rgba(245, 54, 54, 0.9)");
        expect(normalizeColor("Purple")).toBe("Purple");
    });
});

describe("Get Color", () => {
    it("Color Strings", () => {
        expect(getColor("Green", 0)).toBe(` style="color:rgba(50, 172, 45, 0.97)" `);
        expect(getColor("Orange", 0)).toBe(` style="color:rgba(237, 129, 40, 0.89)" `);
        expect(getColor("Red", 0)).toBe(` style="color:rgba(245, 54, 54, 0.9)" `);
        expect(getColor("Purple", 0)).toBe(` style="color:Purple" `);
    });
});

describe("Parse Math Tokens", () => {
    it("Sum", () => {
        expect(parseMathExpression("15+5", 0)).toBe(20);
        expect(parseMathExpression("0.2+2.3", 0)).toBe(3);
    });
    it("Substraction", () => {
        expect(parseMathExpression("15-5", 0)).toBe(10);
        expect(parseMathExpression("0.2-2.3", 0)).toBe(-2);
    });
    it("Multiplication", () => {
        expect(parseMathExpression("3*5", 0)).toBe(15);
        expect(parseMathExpression("0.2*2", 0)).toBe(0);
        expect(parseMathExpression("0.3*2", 0)).toBe(1);
    });
    it("Division", () => {
        expect(parseMathExpression("9/5", 0)).toBe(2);
        expect(parseMathExpression("0.2/2", 0)).toBe(0);
        expect(parseMathExpression("2.3/2", 0)).toBe(1);
    });
    it("Min", () => {
        expect(parseMathExpression("9min5", 0)).toBe(5);
        expect(parseMathExpression("5min9", 0)).toBe(5);
        expect(parseMathExpression("9min0.4", 0)).toBe(0);
        expect(parseMathExpression("5min0.9", 0)).toBe(1);
    });
});

describe("Get Actial name without tokens", () => {
    it("Row and colname", () => {
        expect(getActualNameWithoutTokens("hello")).toBe("hello");
        expect(getActualNameWithoutTokens("hello how are you!")).toBe("hello how are you!");
        expect(getActualNameWithoutTokens("hello _fa-circle_ how are you")).toBe("hello  how are you");
    });
});

describe("Threshold Validator", () => {
    it("BG Colors", () => {
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 5, "black")).toBe("green");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 10, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 15, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red", "blue"], 15, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 20, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 25, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 20, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange"], 25, "black")).toBe("black");
    })
});

describe("Mertic Name from prometheus / influxdb Alias", () => {
    it("Prometheus Format", () => {
        expect(getMetricNameFromTaggedAlias("container_cpu_load_average_10s")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias("container_cpu_load_average_10s ")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias("container_cpu_load_average_10s {}")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(" container_cpu_load_average_10s {}")).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(`container_cpu_load_average_10s{agentpool="agentpool1"}`)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(`container_cpu_load_average_10s {agentpool="agentpool1"}`)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(` container_cpu_load_average_10s { agentpool = "agentpool1" } `)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(` container_cpu_load_average_10s { image = "abc:cba12:hello" } `)).toBe("container_cpu_load_average_10s");
        expect(getMetricNameFromTaggedAlias(`container_memory_usage_bytes{beta_kubernetes_io_arch="amd64",beta_kubernetes_io_instance_type="Standard_D2_v2",beta_kubernetes_io_os="linux",container_name="omsagent",failure_domain_beta_kubernetes_io_region="westeurope",failure_domain_beta_kubernetes_io_zone="0",id="/kubepods/burstable/pod481c9cd6-aaa-11e9-9392-aaaa/aaaaa",image="microsoft/oms@sha256:aaaaa",instance="aaa-aaaa-k8s-nonprod-euw-001-master-2",job="kubernetes-nodes-cadvisor",kubernetes_azure_com_cluster="aaa-aaa-aaa-aaa-K8s-aaa-aaa-001",kubernetes_io_hostname="aaa-aaa-k8s-nonprod-euw-001-master-2",kubernetes_io_role="master",name="k8s_omsagent_omsagent-xh4g9_kube-aaaa-a7ef-11e9-9392-aaaa",namespace="kube-system",pod_name="omsagent-aaaa"}`)).toBe("container_memory_usage_bytes")
    });
    it("InfluxDB Format", () => {
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme ")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme {} ")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias("CPU.CPU TIme {environment: 279, instance: _Total}")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias(" CPU.CPU TIme { environment: 279, instance: _Total}")).toBe("CPU.CPU TIme");
        expect(getMetricNameFromTaggedAlias(" CPU.CPU TIme { environment: 279, equation: `_Tota=l`}")).toBe("CPU.CPU TIme");
    });

});

describe("Value needs to hidden", () => {
    it("Default Values", () => {
        expect(doesValueNeedsToHide(10, undefined)).toBe(false);
        expect(doesValueNeedsToHide(10, { value_below: "5" })).toBe(false);
        expect(doesValueNeedsToHide(10, { value_above: "15" })).toBe(false);
        expect(doesValueNeedsToHide(10, { value_below: "5", value_above: "30" })).toBe(false);
        expect(doesValueNeedsToHide(10, { value_below: " 5 ", value_above: " 30 " })).toBe(false);
        expect(doesValueNeedsToHide(10, { value_below: "15", value_above: "30" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "5", value_above: "5" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "15", value_above: "5" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: "015", value_above: "05" })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: " 015 ", value_above: " 05 " })).toBe(true);
        expect(doesValueNeedsToHide(10, { value_below: " 5 ", value_above: "-5 " })).toBe(true);
    })
});