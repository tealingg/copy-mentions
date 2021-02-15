const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { React, getModule, getAllModules } = require("powercord/webpack");

const { clipboard } = require("electron");

module.exports = class CopyMention extends Plugin {
    async startPlugin() {
        const GuildChannelUserContextMenu = await getModule(m => m.default && m.default.displayName == "GuildChannelUserContextMenu");
        const guildUserName = GuildChannelUserContextMenu.default.displayName
        const ChannelListTextChannelContextMenu = await getAllModules((m) => m.default && m.default.displayName == "ChannelListTextChannelContextMenu", false)[2];
        const channelName = ChannelListTextChannelContextMenu.default.displayName
        const DMUserContextMenu = await getModule(m => m.default && m.default.displayName == "DMUserContextMenu");
        const dmUserName = DMUserContextMenu.default.displayName
        const DeveloperContextMenu = await getModule(m => m.default && m.default.displayName == "DeveloperContextMenu");
        const roleName = DeveloperContextMenu.default.displayName
        const { MenuItem } = await getModule([ "MenuItem" ]);
        console.log(GuildChannelUserContextMenu);
        inject("tealingg-copy-mention-user-guild", GuildChannelUserContextMenu, "default", (args, res) => {
            res.props.children.props.children.push(
                React.createElement(MenuItem, {
                    id: "copy-mention",
                    label: "Copy Mention",
                    action: () => {
                        clipboard.writeText(`<@${args[0].user.id}>`);
                    }
                })
            );
            return res;
        });
        inject("tealingg-copy-mention-user-dm", DMUserContextMenu, "default", (args, res) => {
            res.props.children.props.children.push(
                React.createElement(MenuItem, {
                    id: "copy-mention",
                    label: "Copy Mention",
                    action: () => {
                        clipboard.writeText(`<@${args[0].user.id}>`);
                    }
                })
            );
            return res;
        });
        inject("tealingg-copy-mention-channel", ChannelListTextChannelContextMenu, "default", (args, res) => {
            res.props.children.push(
                React.createElement(MenuItem, {
                    id: "copy-mention",
                    label: "Copy Mention",
                    action: () => {
                        clipboard.writeText(`<#${args[0].channel.id}>`);
                    }
                })
            );
            return res;
        });
        inject("tealingg-copy-mention-role", DeveloperContextMenu, "default", (args, res) => {
            res.props.children = [
                res.props.children,
                React.createElement(MenuItem, {
                    id: "copy-mention",
                    label: "Copy Mention",
                    action: () => {
                        clipboard.writeText(`<@&${args[0].id}>`);
                    }
               })
            ];
            return res;
        });
        GuildChannelUserContextMenu.default.displayName = guildUserName;
        DMUserContextMenu.default.displayName = dmUserName;
        ChannelListTextChannelContextMenu.default.displayName = channelName;
        DeveloperContextMenu.default.displayName = roleName;
    }
    pluginWillUnload() {
        uninject("tealingg-copy-mention-user-guild");
        uninject("tealingg-copy-mention-user-dm");
        uninject("tealingg-copy-mention-channel");
        uninject("tealingg-copy-mention-role");
    }
}
